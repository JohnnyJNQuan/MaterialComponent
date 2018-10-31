import { round, dateDiffInDays } from "../../../components/utility";

const initSummary = {
	contractPrice: 0,
	initialDeposit: 0,
	tax: 0,
	releaseFee: 0,
	rateCharge: 0,
	bcAdminCharge: 0,
	bcSinkingCharge: 0,
	bcInsuranceCharge: 0,
	bcLotCharge: 0,
	waterCharge: 0,
	otherCharge: 0,
	balanceOwing: 0,
	chequeTotals: 0
}

const calcProRataCharge = (adjustmentDate: Date, startDate: Date, endDate: Date, amount: number, adjustment: number, isPaid: boolean) => {
	// calc pro rate charges
	let charge = 0;

	if (!adjustmentDate || !startDate || !endDate) {
		return charge;
	}

	if (!isPaid) {
		// charge full amount if unpaid
		charge = amount;
	} else {
		// paid or paid @s/m
		if (startDate > adjustmentDate) {
			// adjust before current period
			charge = 0;
		} else if (startDate <= adjustmentDate && adjustmentDate <= endDate) {
			// partial amount
			const d = dateDiffInDays(startDate, endDate);
			// const d1 = dateDiffInDays(startDate, adjustmentDate);
			const d2 = dateDiffInDays(adjustmentDate, endDate);
			charge = amount * (d2 / d);
		} else if (endDate < adjustmentDate) {
			// full amount
			charge = amount;
		}
	}

	return round(charge + adjustment, 2);
}

const calcRateCharge = (settlement: any, adjustmentDate: Date) => {
	let charge = 0;

	if (!settlement || !settlement.rateStartDate || !settlement.rateEndDate) {
		return charge;
	}

	if (!settlement.rateIsPaid) {
		// charge full amount if unpaid
		charge = settlement.rateAmount;
	} else {
		// paid or paid @s/m
		if (settlement.rateStartDate > settlement.adjustmentDate) {
			// adjust before current period
			charge = 0;
		} else if (settlement.rateStartDate <= adjustmentDate && adjustmentDate <= settlement.rateEndDate) {
			// partial amount
			const d = dateDiffInDays(settlement.rateStartDate, settlement.rateEndDate);
			// const d1 = dateDiffInDays(settlement.rateStartDate, adjustmentDate);
			const d2 = dateDiffInDays(adjustmentDate, settlement.rateEndDate);
			charge = settlement.rateAmount * (d2 / d);
		} else if (settlement.rateEndDate < adjustmentDate) {
			// full amount
			charge = settlement.rateAmount;
		}
	}

	return round(charge + settlement.rateAdjustment, 2);
}

const calcWaterTieredCharge = (adjustmentDate: Date, paidDate: Date, paidDateReading: number, searchDate: Date, searchDateReading: number,
	tier1ChargeKL: number, tier1ChargeUpto: number, tier2ChargeKL: number, tier2ChargeUpto: number,
	tier3ChargeKL: number, tier3ChargeUpto: number, tier9ChargeKL: number) => {

	// daily usage from reading
	const days = dateDiffInDays(paidDate, searchDate);
	const readings = searchDateReading - paidDateReading;
	const klPerDay = readings / days;

	// https://www.urbanutilities.com.au/residential/accounts-and-billing/how-your-bill-is-calculated

	// Step 1 - Calculate your daily tiered consumption rate
	const tier1ThresholdDailyRate = tier1ChargeUpto / 365;  // Tier 1 threshold daily rate:  (200kL/365 days) = 0.8219
	const tier2ThresholdDailyRate = tier2ChargeUpto / 365;  // Tier 2 threshold daily rate:  (300kL/365 days) = 0.8219
	const tier3ThresholdDailyRate = tier3ChargeUpto / 365;  // Tier 3 threshold daily rate:  (400kL/365 days) = 0.8219

	// Step 2 - Calculate your quarterly threshold
	const tier1ThresholdQuarterlyKl = tier1ThresholdDailyRate * 90;  // Tier 1 - 0.8219 x 90 days = 74kL
	const tier2ThresholdQuarterlyKl = tier2ThresholdDailyRate * 90;  // Tier 2 - all consumption above 74kL
	const tier3ThresholdQuarterlyKl = tier3ThresholdDailyRate * 90;  // Tier 3 - all consumption above 74kL

	// Step 3 - Calculate the charges using the kilolitres that apply in each tier:
	const toPaidDays = dateDiffInDays(paidDate, adjustmentDate);
	const toPaidKl = toPaidDays * klPerDay;

	const tier1Kl = Math.min(toPaidKl, tier1ThresholdQuarterlyKl);
	const tier1Charge = tier1Kl * tier1ChargeKL;  // Tier 1 - 74kL x $0.76814 = $56.85

	let tier2Kl = Math.min(toPaidKl, tier2ThresholdQuarterlyKl) - tier1ThresholdQuarterlyKl;
	if (tier2Kl < 0) tier2Kl = 0;
	const tier2Charge = tier2Kl * tier2ChargeKL;  // Tier 2 - all consumption above 74kL

	let tier3Kl = Math.min(toPaidKl, tier3ThresholdQuarterlyKl) - tier2ThresholdQuarterlyKl;
	if (tier3Kl < 0) tier3Kl = 0;
	const tier3Charge = tier3Kl * tier3ChargeKL;  // Tier 3 - all consumption above 74kL

	const tier9ThresholdQuarterlyKl = Math.max(tier1ThresholdQuarterlyKl, tier3ThresholdQuarterlyKl, tier3ThresholdQuarterlyKl);
	let tier9Kl = toPaidKl - tier9ThresholdQuarterlyKl;
	if (tier9Kl < 0)  tier9Kl = 0;
	const tier9Charge = tier9Kl * tier9ChargeKL;  // Tier 3 - all consumption above 74kL

	let totalCharge = tier1Charge + tier2Charge + tier3Charge + tier9Charge;

	if (paidDate > adjustmentDate) {
	totalCharge = -totalCharge;
	} // refund???

	return round(totalCharge, 2);
}

const calcSummary = (conveyance: any, settlement: any, adjustments: any, cheques: any) => {
	const summary = initSummary;

	// adjustment must be set
	if (!conveyance || !conveyance.adjustmentDate) return summary;

	// calculation based on adjustment date
	const adjustmentDate = new Date(conveyance.adjustmentDate);

	// settlement details
	summary.contractPrice = conveyance !== null ? conveyance.contractPrice : 0;
	summary.initialDeposit = conveyance !== null ? conveyance.initialDeposit : 0;
	summary.tax = conveyance !== null ? conveyance.tax : 0;
	summary.releaseFee = settlement !== null ? (settlement.registrationReleaseFee || 0) * (settlement.registrationReleaseNumber || 0): 0;

	// Rate Charges
	summary.rateCharge = calcProRataCharge(
		adjustmentDate,
		new Date(settlement.rateStartDate),
		new Date(settlement.rateEndDate),
		Number(settlement.rateAmount),
		Number(settlement.rateAdjustment),
		settlement.ratePaidType !== 3
	);

	let waterCharge = 0;
	if (settlement.waterCalculationType === 1) {
		waterCharge = calcWaterTieredCharge(
			adjustmentDate,
			new Date(settlement.waterTierSearchDate),
			settlement.waterTierPaidToReading,
			new Date(settlement.waterTierSearchDate),
			settlement.waterTierSearchReading,
			settlement.waterTier1Charge,
			settlement.waterTier1ChargeUpto,
			settlement.waterTier2Charge,
			settlement.waterTier2Charge,
			settlement.waterTier3Charge,
			settlement.waterTier3ChargeUpto,
			settlement.waterTierChargeBalance
		);
	} else if (settlement.waterCalculationType === 2) {
		waterCharge = calcProRataCharge(
			adjustmentDate,
			new Date(settlement.waterNonTierStartDate),
			new Date(settlement.waterNonTierEndDate),
			Number(settlement.waterNonTierAmount),
			Number(settlement.waterNonTierAdjustment),
			settlement.waterNonTierPaidType === 1 || settlement.waterNonTierPaidType === 2
		);
	}
	summary.waterCharge = round(waterCharge, 2);

	summary.bcAdminCharge = calcProRataCharge(
		adjustmentDate,
		new Date(settlement.bcAdminStartDate),
		new Date(settlement.bcAdminEndDate),
		settlement.bcAdminAmount,
		Number(settlement.bcAdminAdjustment),
		settlement.bcAdminPaidType !== 3
	);

	summary.bcSinkingCharge = calcProRataCharge(
		adjustmentDate,
		new Date(settlement.bcSinkingStartDate),
		new Date(settlement.bcSinkingEndDate),
		Number(settlement.bcSinkingAmount),
		Number(settlement.bcSinkingAdjustment),
		settlement.bcSinkingPaidType !== 3
	);

	summary.bcInsuranceCharge = calcProRataCharge(
		adjustmentDate,
		new Date(settlement.bcInsuranceStartDate),
		new Date(settlement.bcInsuranceEndDate),
		Number(settlement.bcInsuranceAmount),
		Number(settlement.bcInsuranceAdjustment),
		settlement.bcInsurancePaidType !== 3
	);

	// additional and other adjustment
	let otherCharge = 0;
	if (adjustments !== null && adjustments.length > 0) {
		for (const adjustment of adjustments) {
			if (adjustment.isManual === 0) {
				// let startDate = utility.getLocaleDate(adjustments[i].startDate);
				// let endDate = utility.getLocaleDate(adjustments[i].endDate);
				// let isPaid = adjustments[i].paidType === 1 || adjustments[i].paidType === 2;
				// let amount = Number(adjustments[i].amount);
				// let adjustment = Number(adjustments[i].adjustmentAmount);
				otherCharge += calcProRataCharge(
					adjustmentDate,
					new Date(adjustment.startDate),
					new Date(adjustment.endDate),
					Number(adjustment.amount),
					Number(adjustment.adjustmentAmount),
					adjustment.paidType === 1 || adjustment.paidType === 2
				);
			} else {
				otherCharge += Number(adjustment.amount);
			}
		}
	}
	summary.otherCharge = otherCharge;

	// cheques
	let chequeTotals = 0;
	for (const cheque of cheques) {
		chequeTotals += Number(cheque.amount || 0);
	}
	summary.chequeTotals = chequeTotals;

	// rounding
	summary.contractPrice = round(summary.contractPrice, 2);
	summary.initialDeposit = round(summary.initialDeposit, 2);
	summary.tax = round(summary.tax, 2);
	summary.releaseFee = round(summary.releaseFee, 2);
	summary.rateCharge = round(summary.rateCharge, 2);
	summary.waterCharge = round(summary.waterCharge, 2);
	summary.bcAdminCharge = round(summary.bcAdminCharge, 2);
	summary.bcSinkingCharge = round(summary.bcSinkingCharge, 2);
	summary.bcInsuranceCharge = round(summary.bcInsuranceCharge, 2);
	summary.bcLotCharge = round(summary.bcLotCharge, 2);
	summary.otherCharge = round(summary.otherCharge, 2);

	summary.balanceOwing = 
		summary.contractPrice +
		summary.initialDeposit +
		summary.tax +
		summary.releaseFee +
		summary.rateCharge +
		summary.bcAdminCharge +
		summary.bcSinkingCharge +
		summary.bcInsuranceCharge +
		summary.bcLotCharge +
		summary.waterCharge +
		summary.otherCharge;

	return summary;
}

export {
	initSummary,
	calcSummary,
	calcProRataCharge,
	calcRateCharge,
	calcWaterTieredCharge,
}
