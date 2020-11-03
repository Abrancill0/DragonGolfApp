const CalculatePressesTeam = (holesMA, holesMB, holesMC, holesMD, advStrokes, autoPress, switchAdv) => {
    let pressesArray = [null, null, null, null, null, null, null, null, null];
    let before = null;
    let strokesMA = 0;
    let strokesMB = 0;
    let strokesMC = 0;
    let strokesMD = 0;
    let advIndex = 0;
    let totalPresses = [[null, null, null, null, null, null, null, null, null]];
    let indexPress = 0;
    let advWithSwitch = 0;
    let match = 0;
    let medal = 0;
    let totalStrokesMA = 0;
    let totalStrokesMB = 0;
    let totalStrokesMC = 0;
    let totalStrokesMD = 0;
    let isOpenPress = false;

    let team1Min = 0;
    let team2Min = 0;
    let team1Max = 0;
    let team2Max = 0;

    let winTeamMin = 0;
    let winTeamMax = 0;

    for (let index = 0; index < 9; index++) {
        winTeamMin = 0;
        winTeamMax = 0;
        pressesArray = [null, null, null, null, null, null, null, null, null];
        if (holesMA[index].strokes && holesMB[index].strokes && holesMC[index].strokes && holesMD[index].strokes) {
            if (before === null) before = index;
            advWithSwitch = holesMA[index].adv;
            if (switchAdv) {
                if (holesMA[index].adv % 2 === 0) advWithSwitch = holesMA[index].adv - 1;
                else advWithSwitch = holesMA[index].adv + 1;
            }
            advIndex = advWithSwitch - 1;
            strokesMA = holesMA[index].strokes - advStrokes[0][advIndex];
            totalStrokesMA += strokesMA;

            advWithSwitch = holesMB[index].adv;
            if (switchAdv) {
                if (holesMB[index].adv % 2 === 0) advWithSwitch = holesMB[index].adv - 1;
                else advWithSwitch = holesMB[index].adv + 1;
            }
            advIndex = advWithSwitch - 1;
            strokesMB = holesMB[index].strokes - advStrokes[1][advIndex];
            totalStrokesMB += strokesMB;

            advWithSwitch = holesMC[index].adv;
            if (switchAdv) {
                if (holesMC[index].adv % 2 === 0) advWithSwitch = holesMC[index].adv - 1;
                else advWithSwitch = holesMC[index].adv + 1;
            }
            advIndex = advWithSwitch - 1;
            strokesMC = holesMC[index].strokes - advStrokes[2][advIndex];
            totalStrokesMC += strokesMC;

            advWithSwitch = holesMD[index].adv;
            if (switchAdv) {
                if (holesMD[index].adv % 2 === 0) advWithSwitch = holesMD[index].adv - 1;
                else advWithSwitch = holesMD[index].adv + 1;
            }
            advIndex = advWithSwitch - 1;
            strokesMD = holesMD[index].strokes - advStrokes[3][advIndex];
            totalStrokesMD += strokesMD;

            if (strokesMA <= strokesMB) {
                team1Min = strokesMA;
                team1Max = strokesMB;
            } else {
                team1Min = strokesMB;
                team1Max = strokesMA;
            }

            if (strokesMC <= strokesMD) {
                team2Min = strokesMC;
                team2Max = strokesMD;
            } else {
                team2Min = strokesMD;
                team2Max = strokesMC;
            }

            if (team1Min < team2Min) {
                match++;
                for (let j = 0; j <= indexPress; j++) {
                    totalPresses[j][index] = totalPresses[j][before] + 1;
                    winTeamMin = 1;
                }
            } else if (team2Min < team1Min) {
                match--;
                for (let j = 0; j <= indexPress; j++) {
                    totalPresses[j][index] = totalPresses[j][before] - 1;
                    winTeamMin = 2;
                }
            } else {
                for (let j = 0; j <= indexPress; j++) {
                    totalPresses[j][index] = totalPresses[j][before] + 0;
                }
            }

            if (totalPresses[indexPress][index] !== 0 && totalPresses[indexPress][index] % autoPress === 0) {
                // indexPress++;
                // pressesArray[index] = 0;
                // totalPresses.push(pressesArray);
                isOpenPress = true;
            }

            if (team1Max < team2Max) {
                match++;
                // if (isOpenPress === true) {
                //     for (let j = 0; j <= indexPress - 1; j++) {
                //         totalPresses[j][index] = totalPresses[j][index] + 1;
                //     }
                // } else {
                for (let j = 0; j <= indexPress; j++) {
                    totalPresses[j][index] = totalPresses[j][index] + 1;
                    winTeamMax = 1;
                }
                // }
            } else if (team2Max < team1Max) {
                match--;
                // if (isOpenPress === true) {
                //     for (let j = 0; j <= indexPress - 1; j++) {
                //         totalPresses[j][index] = totalPresses[j][index] - 1;
                //     }
                // } else {
                for (let j = 0; j <= indexPress; j++) {
                    totalPresses[j][index] = totalPresses[j][index] - 1;
                    winTeamMax = 2;
                }
                // }
            } else {
                // if (isOpenPress === true) {
                //     for (let j = 0; j <= indexPress - 1; j++) {
                //         totalPresses[j][index] = totalPresses[j][index] + 0;
                //     }
                // } else {
                for (let j = 0; j <= indexPress; j++) {
                    totalPresses[j][index] = totalPresses[j][index] + 0;
                }
                // }
            }

            if ((totalPresses[indexPress][index] !== 0 && totalPresses[indexPress][index] % autoPress === 0) || (isOpenPress && winTeamMin === winTeamMax)) {
                indexPress++;
                pressesArray[index] = 0;
                totalPresses.push(pressesArray);
            }

            before = index;
            isOpenPress = false;
        }
    }

    medal = (totalStrokesMC + totalStrokesMD) - (totalStrokesMA + totalStrokesMB);

    return { totalPresses, match, medal };
}

export default CalculatePressesTeam;