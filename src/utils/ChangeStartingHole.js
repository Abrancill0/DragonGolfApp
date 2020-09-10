export default ChangeStartingHole = (starting_hole, holes) => {
    let front9=[];
    let back9 = [];
    let startIndexFont9 = null;
    let endIndexFont9 = null;
    let startIndexBack9 = null;
    let endIndexBack9 = null;
    if (starting_hole <= 10) {
        if (starting_hole == 10) {
            front9 = holes.slice(9, 18);
            back9 = holes.slice(0, 9);
        } else {
            startIndexFont9 = starting_hole - 1;
            endIndexFont9 = startIndexFont9 + 9;
            front9 = holes.slice(startIndexFont9, endIndexFont9);
            startIndexBack9 = endIndexFont9;
            endIndexBack9 = 18;
            back9 = holes.slice(startIndexBack9, endIndexBack9);
            back9 = back9.concat(holes.slice(0, startIndexFont9));
        }
    } else {
        startIndexFont9 = starting_hole - 1;
        front9 = holes.slice(startIndexFont9, 18);
        endIndexFont9 = 9 - front9.length;
        front9 = front9.concat(holes.slice(0, endIndexFont9));
        startIndexBack9 = endIndexFont9;
        endIndexBack9 = startIndexBack9 + 9;
        back9 = holes.slice(startIndexBack9, endIndexBack9);
    }
    let front9AndBack9Object={
        front9: front9,
        back9: back9
    }
    return front9AndBack9Object;
}