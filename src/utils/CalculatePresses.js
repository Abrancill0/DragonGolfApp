const CalculatePresses = (holesMA, holesMB, advStrokes, autoPress, switchAdv) => {
  let pressesArray = [null, null, null, null, null, null, null, null, null];
  let before = null;
  let strokesMA = 0;
  let strokesMB = 0;
  let advIndex = 0;
  let totalPresses = [[null, null, null, null, null, null, null, null, null]];
  let indexPress = 0;
  let advWithSwitch = 0;
  let match = 0;
  let medal = 0;
  let totalStrokesMA = 0;
  let totalStrokesMB = 0;

  // Guardar los ganados y los perdidos por separado, comparar cual es mayor y regresar al mayor
  // si ganados es mayor a perdidos regresar ganados
  // si perdidos es mayor a ganados regresar perdidos (en negativo)

  for (let index = 0; index < 9; index++) {
    pressesArray = [null, null, null, null, null, null, null, null, null];
    if (holesMA[index].strokes && holesMB[index].strokes) {
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
      if (strokesMA < strokesMB) {
        match++;
        // console.log('INCREMENTA');
        // console.log(match);
        for (let j = 0; j <= indexPress; j++) {
          totalPresses[j][index] = totalPresses[j][before] + 1;
        }
      } else if (strokesMA > strokesMB) {
        match--;
        // console.log('RESTA');
        // console.log(match);
        for (let j = 0; j <= indexPress; j++) {
          totalPresses[j][index] = totalPresses[j][before] - 1;
        }
      } else {
        for (let j = 0; j <= indexPress; j++) {
          totalPresses[j][index] = totalPresses[j][before] + 0;
        }
      }

      if (totalPresses[indexPress][index] !== 0 && totalPresses[indexPress][index] % autoPress === 0) {
        indexPress++;
        pressesArray[index] = 0;
        totalPresses.push(pressesArray);
      }

      before = index;
    }
  }

  medal = totalStrokesMB - totalStrokesMA;
  // console.log(match)

  return {totalPresses, match, medal};
}

export default CalculatePresses;