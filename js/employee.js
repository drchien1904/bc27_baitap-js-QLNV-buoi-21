// Định nghĩa lớp đối tượng Employee
function Employee(
    tknv,
    name,
    email,
    password,
    datepicker,
    luongCB,
    chucvu,
    gioLam,
    tongLuong,
    ) {
    this.tknv = tknv;
    this.name = name;
    this.email = email;
    this.password = password;
    this.datepicker = datepicker;
    this.luongCB = luongCB;
    this.chucvu = chucvu;
    this.gioLam = gioLam;
    this.tongLuong = tongLuong;
  }
  
  Employee.prototype.calcScore = function () {
    return this.gioLam*this.luongCB;
  };