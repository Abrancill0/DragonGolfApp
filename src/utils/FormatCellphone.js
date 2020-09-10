export default FormatCellphone = (cellphone) => {
    //Filter only numbers from the input
    let cleaned = ('' + cellphone).replace(/\D/g, '');

    //Check if the input is of correct length
    let match1 = cleaned.match(/^(\d{3})$/);
    let match2 = cleaned.match(/^(\d{3})(\d{3})$/);
    let match3 = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    let formatted = '';

    if (match3) {
      formatted = '(' + match3[1] + ') ' + match3[2] + '-' + match3[3];
    } else if (match2) {
      formatted = '(' + match2[1] + ') ' + match2[2] + '-';
    } else if (match1) {
      formatted = '(' + match1[1] + ') ';
    }else{
        formatted = cellphone;
    }

    return formatted;
  }