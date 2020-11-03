import Database from '../database/database';

const database = new Database();

const CalculateAdv = async (handicap, teeId) => {
    let numberHole = null;
    let i = 0;
    let adv = null;
    let holes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let advStrokes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let auxHcpCourse = handicap;
    while (auxHcpCourse > 0) {
        advStrokes[i]++;
        auxHcpCourse--;
        i++;
        if (i == 18) {
            i = 0;
        }
    }
    return  advStrokes;
    console.log('************ Ventajas calculadas en funcion: ', advStrokes);
    const dbHoles = await database.holesByTeeId(teeId);
    dbHoles.forEach(element => {
        numberHole = parseInt(element.hole_number) - 1;
        adv = parseInt(element.adv) - 1;
        holes[numberHole] = advStrokes[adv];
    });
    console.log('Ventajas en hoyos: ', holes);
    return holes;
}

export default CalculateAdv;