// Tạo mảng danh sách employee
var employees = [];
init();

// Hàm này sẽ tự động được gọi đầu tiên khi chương trình được chạy
// Hàm này dùng để lấy data từ local storage và gán lại cho mảng employees sau đó hiển thị ra giao diện
function init() {
  // B1: Lấy data từ localStorage
  // Khi lấy data từ localStorage lên, nếu data là array/object (đã bị stringify) thì cần dùng hàm JSON.parse để chuyển data về lại array/object
  employees = JSON.parse(localStorage.getItem("employees")) || [];

  // Bởi vì JSON.stringify tự động loại bỏ các phương thức bên trong object => các object employee bên trong mảng bị mất hàm calcScore

  for (var i = 0; i < employees.length; i++) {
    //Tạo ra biến employee nhưng anh ko sử dụng
    var employee = employees[i];
    //Sai cú pháp
    employees[i] = new Employee(
      employee.tknv,
      employee.name,
      employee.email,
      employee.password,
      employee.datePicker,
      employee.luongCB,
      employee.chucvu,
      employee.gioLam,
      employee.tongLuong
    );
  }

  // B2: Gọi hàm display để hiển thị ra giao diện
  display(employees);
}

function addEmployee() {
  // B1: DOM lấy value
  var tknv = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datePicker = document.getElementById("datePicker").value;
  var luongCB = document.getElementById("luongCB").value;
  var chucvu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;
  var tongLuong = +document.getElementById("tongLuong").value;

  // var isValid = validation();

  // if (!isValid) {
  //   alert("Vui lòng nhập vào các giá trị");
  //   return;
  // }

  // B2: Khởi tạo đối tượng Employee từ lớp đối tượng employee
  //Đối tượng là Employee ko phải employee
  var employee = new Employee(
    tknv,
    name,
    email,
    password,
    datePicker,
    luongCB,
    chucvu,
    gioLam,
    tongLuong
  );
  console.log(employee);

  // B3: Hiển thị employee vừa thêm lên trên giao diện (table)
  // Thêm employee vừa tạo vào mảng employees
  employees.push(employee);

  // B4: Lưu biến employees xuống local storage
  // Local Storage cho phép lưu trữ data trong trình duyệt, data này sẽ không bị mất đi khi ta refresh hoặc tắt trình duyệt
  // localStorage.setItem(key, value) là hàm dùng để lưu data xuống Local Storage
  // JSON.stringify(value) là hàm dùng để chuyển 1 array/object thành 1 chuỗi dạng JSON
  localStorage.setItem("employees", JSON.stringify(employees));

  // Gọi hàm display và truyền vào mảng employees để hiển thị lên trên table
  display(employees);
  // Gọi hàm resetForm để set giá trị của các input về rỗng
  resetForm();
}

function display(employees) {
  var tbodyEl = document.getElementById("tbodyNV");
  // Chứa nội dung html sẽ được thêm vào bên trong tbody
  var html = "";

  // Duyệt mảng employees
  for (var i = 0; i < employees.length; i++) {
    var employee = employees[i];
    // Với mỗi employee tạo ra 1 thẻ tr và từng thẻ td chứa thông tin của chính employee đó
    console.log(employee);
    html += `
      <tr>
      <td>${employee.tknv}</td>
      <td>${employee.name}</td>
      <td>${employee.email}</td>
      <td>${employee.datepicker}</td>
      <td>${employee.chucvu}</td>
      <td>${employee.calcScore()}</td>
        <td>
          <button
            class="btn btn-success"
            
          >
            Cập nhật
          </button>
          <button
            class="btn btn-danger"
            onclick="deleteemployee('${employee.id}')"
          >
            Xoá
          </button>
        </td>
      </tr>
    `;
    // onclick="selectemployee('${employee.id}')"
  }

  // Đưa nội dung html được tạo động từ các đối tượng employee vào bên trong tbody
  tbodyEl.innerHTML = html;
}

function deleteEmployee(employeeId) {
  console.log("typeof của employeeId", typeof employeeId);
  // Dùng id của employee tìm ra và xoá employee đó đi

  // Tìm chỉ mục của phần tử muốn xoá trong mảng employees
  var index = findemployee(employeeId);

  if (index !== -1) {
    // Xoá 1 phần tử ở 1 vị trí bất kì trong mảng
    employees.splice(index, 1);
    // Lưu thông tin mảng employees xuống localstorage
    localStorage.setItem("employees", JSON.stringify(employees));
    // Gọi lại hàm display để cập nhật giao diện mới
    display(employees);
  }
}

function searchemployee() {
  // B1: DOM lấy value
  var searchValue = document.getElementById("txtSearch").value;
  searchValue = searchValue.toLowerCase();
  // B2: Lọc ra 1 mảng mới thoả mãn điều kiện giá trị searchValue phải bằng với tên NV
  // 'Nguyễn Đức Hiếu'.indexOf("Hiếu") => 11
  // 'Nguyễn Đức Hiếu'.indexOf("Khải") => -1

  var newemployees = [];
  for (var i = 0; i < employees.length; i++) {
    var employee = employees[i];
    var employeeName = employee.name.toLowerCase();
    if (employeeName.indexOf(searchValue) !== -1) {
      newemployees.push(employee);
    }
  }
  // B3: Hiển thị ra giao diện danh sách nhân viên đã lọc
  display(newemployees);
}

function resetForm() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datePicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
  document.getElementById("tongLuong").value = "";

  // document.getElementById("tknv").disabled = false;
  // document.getElementById("btnAddemployee").disabled = false;
}

// function này được gọi khi click vào nút Cập Nhật của 1 nhân viên trên table
function selectEmployee(employeeId) {
  // Dùng employeeId để tìm employee muốn cập nhât
  var index = findEmployee(employeeId);
  // Lấy ra employee muốn cập nhật từ mảng employees
  var employee = employees[index];
  // Đưa thông tin của employee này lên giao diện
  document.getElementById("tknv").value = employee.tknv;
  document.getElementById("name").value = employee.name;
  document.getElementById("email").value = employee.email;
  document.getElementById("password").value = employee.password;
  document.getElementById("datePicker").value = employee.datePicker;
  document.getElementById("luongCB").value = employee.course;
  document.getElementById("chucvu").value = employee.chucvu;
  document.getElementById("gioLam").value = employee.gioLam;
  document.getElementById("tongLuong").value = employee.tongLuong;

  // disabled input số tài khoản nhân Viên và button Thêm nhân Viên
  document.getElementById("txtMaNV").disabled = true;
  document.getElementById("btnAddemployee").disabled = true;
}

// function này nhận vào employeeId và trả ra vị trí (index) của employee bên trong mảng
function findemployee(employeeId) {
  var index = -1;
  for (var i = 0; i < employees.length; i++) {
    // Kiếm phần tử employee trong mảng nào có id khớp với employeeId
    if (employees[i].tknv === employeeId) {
      index = i;
      break;
    }
  }
  return index;
}

// Hàm nãy sẽ được gọi khi click vào nút Cập Nhật ở bên dưới form
function updateEmployee() {
  // B1: DOM lấy value từ các input
  var tknv = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datePicker = document.getElementById("datePicker").value;
  var luongCB = +document.getElementById("luongCB").value;
  var chucvu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;
  var tongLuong = +document.getElementById("tongLuong").value;

  // B2: Khởi tạo đối tượng employee từ các giá trị input
  var employee = new employee(
    tknv,
    name,
    email,
    password,
    datePicker,
    luongCB,
    chucvu,
    gioLam,
    tongLuong
  );
  // Viết B1 + B2 ra 1 hàm getemployee và return về employee
  // => var employee = getemployee()

  // B3: Cập nhật
  // Tìm index của nhân viên muốn cập nhật
  var index = findemployee(employee.id);
  // Cập nhật
  employees[index] = employee;
  // Lưu thông tin mảng employees xuống localstorage
  localStorage.setItem("employees", JSON.stringify(employees));

  // B4: Gọi hàm display để hiển thị kết quả mới nhất lên giao diện
  display(employees);
  resetForm();
}

// Các hàm kiểm tra xem input có hợp lệ hay không
// Anh sai mã id phần này! sửa lại rồi test lại đi anh
function validation() {
  var tknv = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datePicker = document.getElementById("datePicker").value;
  var luongCB = +document.getElementById("luongCB").value;
  var chucvu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;
  var tongLuong = +document.getElementById("tongLuong").value;

  var isValid = true;

  // MaNV không hợp lệ
  if (!isRequired(tknv)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML = "Mã NV không được để trống";
  } else if (!minLength(tknv, 3)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML =
      "Mã NV phải có ít nhất 3 kí tự";
  }

  // Kiểm tra tên nhân viên
  // Dùng regex để tạo ra 1 chuỗi validate tên nhân viên (chỉ bao gồm các kí tự hoa và thường)
  // Cách kiểm tra: regex.test(value), nếu khớp trả ra true, ngược lại trả ra false
  var letters = new RegExp("^[A-Za-z]+$");
  if (!isRequired(name)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML = "Tên NV không được để trống";
  } else if (!minLength(name, 8)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML =
      "Tên NV phải có ít nhất 8 kí tự";
  } else if (!letters.test(name)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML =
      "Tên NV có kí tự không hợp lệ";
  }

  // Dùng regex để kiểm tra email có đúng định dạng hay không
  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("spanEmailNV").innerHTML =
      "Email SV không được để trống";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML =
      "Email SV không đúng định dạng";
  }

  // Dùng regex để kiểm tra mật khẩu có đúng định dạng hay không
  var pwPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!isRequired(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      "Mật khẩu NV không được để trống";
  } else if (!pwPattern.test(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      "Mật khẩu NV không đúng định dạng";
  } else {
    // Đúng
    document.getElementById("tbMatKhau").innerHTML = "";
  }

  return isValid;
}

// Hàm kiểm tra input có rỗng hay không
function isRequired(value) {
  if (!value) {
    return false;
  }

  return true;
}

// Hàm kiểm tra input có đủ độ dài hay không
function minLength(value, limit) {
  if (value.length < limit) {
    return false;
  }

  return true;
}
