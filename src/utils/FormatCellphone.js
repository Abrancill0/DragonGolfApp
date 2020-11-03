export default FormatCellphone = (cellphone) => {
    //Filter only numbers from the input
    let cleaned = ('' + cellphone).replace(/\D/g, '');

    //Check if the input is of correct length
    let match1 = cleaned.match(/^(\d{3})(\d{3})$/);
    let match2 = cleaned.match(/^(\d{3})(\d{3})(\d{1})$/);
    let match3 = cleaned.match(/^(\d{3})(\d{3})(\d{2})$/);
    let match4 = cleaned.match(/^(\d{3})(\d{3})(\d{3})$/);
    let match5 = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    let formatted = '';

    if (match5) {
      formatted = ' ' + match5[1] + ' ' + match5[2] + ' ' + match5[3];
    }
    else if (match4) {
      formatted = ' ' + match4[1] + ' ' + match4[2] + ' ' + match4[3];
    }
    else if (match3) {
      formatted = ' ' + match3[1] + ' ' + match3[2] + ' ' + match3[3];
    } else if (match2) {
      formatted = ' ' + match2[1] + ' ' + match2[2] + ' ' + match2[3];
    } else if (match1) {
      formatted = ' ' + match1[1] + ' ' + match1[2];
    }else{
        formatted = cellphone;
    }

    return formatted;
  }