function calculate() {
    const calcType = input.get('loan_type').index().val();

    const pv = input.get('starting_amount').nonNegative().val();
    const years = input.get('after').positive().val();
    const rate = input.get('return_rate').positive().val();
    const compound = input.get('compound').index().val();
    const contribution = input.get('additional_contribution').nonNegative().val();
    const annualIncreaseRate = input.get('annual_increase').nonNegative().val();

    const fv2 = input.get('your_target_2').positive().val();
    const pv2 = input.get('starting_amount_2').nonNegative().lt('your_target_2').val();
    const years2 = input.get('after_2').positive().val();
    const rate2 = input.get('return_rate_2').positive().val();
    const compound2 = input.get('compound_2').index().val();
    const annualIncreaseRate2 = input.get('annual_increase_2').nonNegative().val();


    const fv3 = input.get('your_target_3').positive().val();
    const pv3 = input.get('starting_amount_3').nonNegative().lt('your_target_3').val();
    const years3 = input.get('after_3').positive().val();
    const compound3 = 0;
    const contribution3 = input.get('additional_contribution_3').nonNegative().lt('your_target_3').val();
    const annualIncreaseRate3 = input.get('annual_increase_3').nonNegative().val();


    const fv4 = input.get('your_target_4').positive().val();
    const years4 = input.get('after_4').positive().val();
    const rate4 = input.get('return_rate_4').positive().val();
    const compound4 = input.get('compound_4').index().val();
    const contribution4 = input.get('additional_contribution_4').nonNegative().lt('your_target_4').val();
    const annualIncreaseRate4 = input.get('annual_increase_4').nonNegative().val();

    const fv5 = input.get('your_target_5').positive().val();
    const pv5 = input.get('starting_amount_5').nonNegative().lt('your_target_5').val();
    const rate5 = input.get('return_rate_5').positive().val();
    const compound5 = input.get('compound_5').index().val();
    const contribution5 = input.get('additional_contribution_5').nonNegative().lt('your_target_5').val();
    const annualIncreaseRate5 = input.get('annual_increase_5').nonNegative().val();


    if (!input.valid()) return;

    if (calcType === 0) {
        // End Amount
        const result = calculateAmortization(pv, years, rate, getCompound(compound), contribution, annualIncreaseRate);
        const fv = result[result.length - 1].endBalance;
        const totalInterest = result[result.length - 1].totalInterest;
        const totalPrincipal = result[result.length - 1].totalContribution + pv;
        output.val(`End Balance: ${currencyFormat(fv)}`).set('resultA-1');
        output.val(`Total Principal: ${currencyFormat(totalPrincipal)}`).set('resultA-2');
        output.val(`Total Interest: ${currencyFormat(totalInterest)}`).set('resultA-3');
        showResult(result, pv);
    }
    else if (calcType === 1) {
        // Monthly Contribution
        const { endBalance } = calculateFV(pv2, years2, rate2, getCompound(compound2), 0, annualIncreaseRate2);
        let contribution2;
        if (endBalance > fv2) {
            contribution2 = 0;
        } else {
            contribution2 = findAmortizationParam(50, (c) => {
                const amortization = calculateFV(pv2, years2, rate2, getCompound(compound2), c, annualIncreaseRate2);
                return fv2 / amortization.endBalance;
            });
        }

        const result2 = calculateAmortization(pv2, years2, rate2, getCompound(compound2), contribution2, annualIncreaseRate2);
        const totalInterest = result2[result2.length - 1].totalInterest;
        const totalPrincipal = result2[result2.length - 1].totalContribution + pv;
        output.val(`You will need an initial monthly contribution of ${currencyFormat(contribution2)} to reach the target of ${currencyFormat(fv2)}`).set('resultB');
        output.val(`End Balance: ${currencyFormat(fv2)}`).set('resultB-1');
        output.val(`Total Principal: ${currencyFormat(totalPrincipal)}`).set('resultB-2');
        output.val(`Total Interest: ${currencyFormat(totalInterest)}`).set('resultB-3');
        showResult(result2, pv2);
    }
    else if (calcType === 2) {
        // Interest Rate
        const { totalContribution } = calculateFV(pv3, years3, 0, getCompound(compound3), contribution3, annualIncreaseRate3);
        const totalInvested = pv3 + totalContribution;
        if (totalInvested > fv3) {
            return input.error(['starting_amount_3', 'additional_contribution_3'], 'Total invested cannot be greater than your savings goal', true);
        }

        const rate3 = findAmortizationParam(1, (r) => {
            const amortization = calculateFV(pv3, years3, r, getCompound(compound3), contribution3, annualIncreaseRate3);
            return fv3 / amortization.endBalance;
        });

        const result3 = calculateAmortization(pv3, years3, rate3, getCompound(compound3), contribution3, 0);
        const totalInterest = result3[result3.length - 1].totalInterest;
        const totalPrincipal = result3[result3.length - 1].totalContribution + pv3;
        output.val(`You will need an annual interest rate of ${rate3.toFixed(2)}% to reach the target of ${currencyFormat(fv3)}`).set('resultC');
        output.val(`End Balance: ${currencyFormat(fv3)}`).set('resultC-1');
        output.val(`Total Principal: ${currencyFormat(totalPrincipal)}`).set('resultC-2');
        output.val(`Total Interest: ${currencyFormat(totalInterest)}`).set('resultC-3');
        showResult(result3, pv3);
    }
    else if (calcType === 3) {
        // Lump Sum Amount
        const { endBalance } = calculateFV(0, years4, rate4, getCompound(compound4), contribution4, annualIncreaseRate4);
        let pv4;
        if (endBalance > fv4) {
            pv4 = 0;
        } else {
            pv4 = findAmortizationParam(5000, (pv) => {
                const amortization = calculateFV(pv, years4, rate4, getCompound(compound4), contribution4, annualIncreaseRate4);
                return fv4 / amortization.endBalance;
            });
        }

        const result4 = calculateAmortization(pv4, years4, rate4, getCompound(compound4), contribution4, 0);
        const totalInterest = result4[result4.length - 1].totalInterest;
        const totalPrincipal = result4[result4.length - 1].totalContribution + pv4;
        output.val(`You will need to invest ${currencyFormat(pv4)} at the beginning to reach the target of ${currencyFormat(fv4)}`).set('resultD');
        output.val(`End Balance: ${currencyFormat(fv4)}`).set('resultD-1');
        output.val(`Total Principal: ${currencyFormat(totalPrincipal)}`).set('resultD-2');
        output.val(`Total Interest: ${currencyFormat(totalInterest)}`).set('resultD-3');
        showResult(result4, pv4);
    }
    else if (calcType === 4) {
        // Investment Term
        const totalInvested = pv5 + contribution5;
        if (totalInvested > fv5) {
            return input.error(['starting_amount_5', 'additional_contribution_5'], 'Total invested cannot be greater than your savings goal', true);
        }

        const years5 = findAmortizationParam(1, (y) => {
            const amortization = calculateFV(pv5, y, rate5, getCompound(compound5), contribution5, annualIncreaseRate5);
            return fv5 / amortization.endBalance;
        });

        const result5 = calculateAmortization(pv5, years5, rate5, getCompound(compound5), contribution5, annualIncreaseRate5);
        const totalInterest = result5[result5.length - 1].totalInterest;
        const totalPrincipal = result5[result5.length - 1].totalContribution + pv5;
        output.val(`You will need to invest ${years5.toFixed(1)} years to reach the target of ${currencyFormat(fv5)}`).set('resultE');
        output.val(`End Balance: ${currencyFormat(fv5)}`).set('resultE-1');
        output.val(`Total Principal: ${currencyFormat(totalPrincipal)}`).set('resultE-2');
        output.val(`Total Interest: ${currencyFormat(totalInterest)}`).set('resultE-3');
        showResult(result5, pv5);
    }
}

function showResult(result, principal) {
    let annualResults = [];
    let chartData = [[], [], [], []];
    let annualInterest = 0;
    let annualContribution = 0;
    let monthlyResultsHtml = '';
    let annualResultsHtml = '';
    result.forEach((item, index) => {
        monthlyResultsHtml += `<tr>
            <td class="text-center">${index + 1}</td>
            <td>${currencyFormat(item.startBalance)}</td>
            <td>${currencyFormat(item.interestPayment)}</td>
            <td>${currencyFormat(item.contributionAmount)}</td>
            <td>${currencyFormat(item.endBalance)}</td>
        </tr>`;
        annualInterest += item.interestPayment;
        annualContribution += item.contributionAmount;
        if ((index + 1) % 12 === 0 || (index + 1) === result.length) {
            let title = 'Year #{1} End'.replace('{1}', Math.ceil((index + 1) / 12).toString());
            monthlyResultsHtml += `<th class="indigo text-center" colspan="5">${title}</th>`;
        }
        if ((index + 1) % 12 === 0 || (index + 1) === result.length) {
            annualResults.push({
                "interestPayment": annualInterest,
                "contribution": annualContribution,
                "endBalance": item.endBalance,
                "startBalance": item.startBalance,
                "totalInterest": item.totalInterest,
                "totalContributions": item.totalContribution,
            });
            annualInterest = 0;
            annualContribution = 0;
        }
    });
    const years = Math.ceil(result.length / 12);
    let chartLegendHtml = '';
    for (let i = 0; i <= years / 5; i++) {
        chartLegendHtml += `<p class="result-text result-text--small">${i * 5} yr</p>`;
    }
    if (years % 5 !== 0) {
        chartLegendHtml += `<p class="result-text result-text--small">${years} yr</p>`;
    }
    annualResults.forEach((r, index) => {
        annualResultsHtml += `<tr>
            <td class="text-center">${index + 1}</td>
            <td>${currencyFormat(r.startBalance)}</td>
            <td>${currencyFormat(r.interestPayment)}</td>
            <td>${currencyFormat(r.contribution)}</td>
            <td>${currencyFormat(r.endBalance)}</td>
    </tr>`;
        chartData[0].push((index + 1));
        chartData[1].push(roundTo(principal, 0));
        chartData[2].push(roundTo(r.totalInterest, 0));
        chartData[3].push(roundTo(r.totalContributions, 0));
    });
    const fv = result[result.length - 1].endBalance;
    const totalInterest = result[result.length - 1].totalInterest;
    const totalContributions = result.reduce((acc, item) => acc + item.contributionAmount, 0);
    const interestPercent = totalInterest / fv * 100;
    const contributionPercent = totalContributions / fv * 100;
    const principalPercent = principal / fv * 100;

    changeChartData([roundTo(interestPercent, 0), roundTo(principalPercent, 0), roundTo(contributionPercent, 0)], chartData);
    _('chart__legend').innerHTML = chartLegendHtml;
    output.val(annualResultsHtml).set('annual-results');
    output.val(monthlyResultsHtml).set('monthly-results');
}

function getCompound(compound) {
    switch (compound) {
        case 0:
            return 12;
        case 1:
            return 2;
        case 2:
            return 4;
        case 3:
            return 24;
        case 4:
            return 26;
        case 5:
            return 52;
        case 6:
            return 365;
    }
}

function calculateAmortization(
    principal,
    years,
    rate,
    compound = 12,
    initialContribution = 0,
    annualIncreaseRate = 0,
) {
    const months = years * 12;
    const cc = compound / 12
    const interest = rate / 100 / compound;
    const ratePayB = Math.pow(1 + interest, cc) - 1;

    let amortization = [];
    let contribution = initialContribution;
    let balance = principal;
    let totalContribution = 0;
    let totalInterest = 0;
    for (let i = 1; i <= months; i++) {
        balance += contribution;
        totalContribution += contribution;

        const startBalance = balance;
        const interestPayment = balance * ratePayB;
        totalInterest += interestPayment;
        balance += interestPayment;

        amortization.push({
            startBalance,
            endBalance: balance,
            interestPayment,
            totalContribution,
            totalInterest,
            contributionAmount: contribution
        });

        if (annualIncreaseRate && i % 12 === 0) {
            contribution *= 1 + annualIncreaseRate / 100;
        }
    }
    return amortization;
}

function findAmortizationParam(
    initialIncrement,
    resultGetter
) {
    let delta = 0.00005;
    for (let d = 0; d < 12; d++) {
        let dm = 1 - delta;
        let dp = 1 + delta;
        for (let r = 0; r <= 10; r++) {
            let value = 0.1;
            let increment = initialIncrement * Math.pow(2, r);
            for (let i = 0; i < 1000; i++) {
                const ratio = resultGetter(value);
                if (ratio < dm) {
                    value -= increment;
                    increment = increment / 2;
                } else if (ratio >= dm && ratio <= dp) {
                    if (value < 0) {
                        input.error([], 'Please check the input values are reasonable', true);
                        return 0;
                    }
                    return value;
                } else {
                    value += increment;
                }
            }
        }
        delta += delta;
    }

    input.error([], 'Please check the input values are reasonable', true);
    return 0;
}

function currencyFormat(num) {
    return 'R ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function calculateFV(
    pv,
    years,
    rate,
    compound = 12,
    contribution = 0,
    annualIncreaseRate = 0
) {
    const amortization = calculateAmortization(pv, years, rate, compound, contribution, annualIncreaseRate);
    return amortization[amortization.length - 1];
}
