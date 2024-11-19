let currentMonth = new Date().getMonth();  // Lấy tháng hiện tại (0-11)
let currentYear = new Date().getFullYear();  // Lấy năm hiện tại
let selectedDayElement = null;  // Để lưu trữ ngày đã chọn

// Hàm tạo dòng thứ (ngày trong tuần)
function generateDaysOfWeek() {
    const daysOfWeekContainer = document.getElementById('daysOfWeek');
    if (!daysOfWeekContainer) {
        return; // Nếu không tìm thấy phần tử, dừng hàm
    }
    daysOfWeekContainer.innerHTML = '';  // Xóa nội dung cũ nếu có
    daysOfWeekContainer.style.width = '100%';
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        daysOfWeekContainer.appendChild(dayElement);
    });
}

function generateCalendar(month, year) {
    const calendar = document.getElementById('calendar');
    if (!calendar) {
        return; // Nếu không tìm thấy phần tử, dừng hàm
    }
    calendar.innerHTML = ''; // Xóa nội dung cũ
    calendar.style.width = '100%';
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const startDay = firstDay === 0 ? 6 : firstDay - 1; // Điều chỉnh chỉ số thứ (Sun là 0)

    // Lấy ngày hiện tại
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Thêm các ngày của tháng trước nếu cần
    for (let i = startDay - 1; i >= 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('empty');
        calendar.appendChild(dayElement);
    }

    // Thêm các ngày trong tháng hiện tại
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        
        dayElement.addEventListener('click', function() {
            if (selectedDayElement) {
                selectedDayElement.classList.remove('selected');
            }
            dayElement.classList.add('selected');
            selectedDayElement = dayElement;

            // Lấy ngày đã chọn theo định dạng 'dd-mm-yyyy'
            const dayFormatted = day < 10 ? `0${day}` : day;
            const monthFormatted = (month + 1) < 10 ? `0${month + 1}` : (month + 1);
            const dateKey = `${dayFormatted}-${monthFormatted}-${year}`;

            // Gọi hàm hiển thị nhiệm vụ
            displayTasks(dateKey);
        });

        // Kiểm tra xem ngày hiện tại có trùng với ngày này không
        if (day === currentDay && month === currentMonth && year === currentYear) {
            dayElement.classList.add('current');
            //const circle = document.createElement('div');
            //circle.classList.add('today-circle');
            //circle.textContent = day; // Hiển thị số ngày bên trong hình tròn
            //dayElement.innerHTML = ''; // Xóa nội dung cũ
            //dayElement.appendChild(circle); // Thêm hình tròn vào
        }

        calendar.appendChild(dayElement);
    }

    // Thêm các ngày của tháng sau nếu cần
    let totalCells = calendar.children.length;
    let nextMonthDay = 1;
    while (totalCells < 35) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('empty');
        calendar.appendChild(dayElement);
        totalCells++;
    }

    document.getElementById('monthYear').textContent = `Tháng ${month + 1} ${year}`;
}


document.addEventListener('DOMContentLoaded', function () {
    let prevMonthButton = document.getElementById('prevMonth');
    let nextMonthButton = document.getElementById('nextMonth');

    // Kiểm tra xem phần tử có tồn tại không trước khi gán sự kiện
    if (prevMonthButton) {
        prevMonthButton.addEventListener('click', function () {
            // Logic cho nút trước
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11; // Quay lại tháng 12 của năm trước
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear); // Cập nhật lịch
        });
    }

    if (nextMonthButton) {
        nextMonthButton.addEventListener('click', function () {
            // Logic cho nút sau
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0; // Quay lại tháng 1 của năm sau
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear); // Cập nhật lịch
        });
    }
});


// Gọi hàm tạo lịch ban đầu
generateCalendar(currentMonth, currentYear);

function newCalendar(month, year) {
    const calendar = document.getElementById('newCalendar');
    if (!calendar) {
        return; // Dừng hàm nếu không tìm thấy phần tử
    }
    calendar.innerHTML = ''; // Xóa nội dung cũ

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const startDay = firstDay === 0 ? 6 : firstDay - 1; // Điều chỉnh chỉ số thứ (Sun là 0)

    // Lấy ngày hiện tại
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Thêm các ngày của tháng trước nếu cần
    for (let i = startDay - 1; i >= 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('empty');
        calendar.appendChild(dayElement);
    }

    // Thêm các ngày trong tháng hiện tại
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        
        dayElement.addEventListener('click', function() {
            if (selectedDayElement) {
                selectedDayElement.classList.remove('selected');
            }
            dayElement.classList.add('selected');
            selectedDayElement = dayElement;

            // Lấy ngày đã chọn theo định dạng 'dd-mm-yyyy'
            const dayFormatted = day < 10 ? `0${day}` : day;
            const monthFormatted = (month + 1) < 10 ? `0${month + 1}` : (month + 1);
            const dateKey = `${dayFormatted}-${monthFormatted}-${year}`;

            // Gọi hàm hiển thị nhiệm vụ
            displayTasks(dateKey);
        });

        // Kiểm tra xem ngày hiện tại có trùng với ngày này không
        if (day === currentDay && month === currentMonth && year === currentYear) {
            dayElement.classList.add('current');
            //const circle = document.createElement('div');
            //circle.classList.add('today-circle');
            //circle.textContent = day; // Hiển thị số ngày bên trong hình tròn
            //dayElement.innerHTML = ''; // Xóa nội dung cũ
            //dayElement.appendChild(circle); // Thêm hình tròn vào
        }

        calendar.appendChild(dayElement);
    }
generateDaysOfWeek();
newCalendar(currentMonth, currentYear);
    // Thêm các ngày của tháng sau nếu cần
    let totalCells = calendar.children.length;
    let nextMonthDay = 1;
    while (totalCells < 35) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('empty');
        calendar.appendChild(dayElement);
        totalCells++;
    }

    document.getElementById('monthYear').textContent = `Tháng ${month + 1} ${year}`;
}

// Danh sách nhiệm vụ mặc định được tạo bởi hệ thống\
const defaultTasks = {
    "11-11-2024": [
        { title: "Nhiệm vụ A", time: "10:00", tag: "Quan trọng", reminder: "09:00", location: "Phòng họp 1", status: "Đang chờ" },
        { title: "Nhiệm vụ B", time: "14:00", tag: "không", reminder: "13:00", location: "Văn phòng", status: "Đang làm" }
    ],
    "30-11-2024": [
        { title: "Xem xét báo cáo", time: "16:00", tag: "Quan trọng", reminder: "15:00", location: "Văn phòng", status: "Đang làm" },
        { title: "Xem xét báo cáo", time: "16:00", tag: "Quan trọng", reminder: "15:00", location: "Văn phòng", status: "Đang làm" },
        { title: "Xem xét báo cáo", time: "16:00", tag: "Quan trọng", reminder: "15:00", location: "Văn phòng", status: "Đang làm" },
        { title: "Xem xét báo cáo", time: "16:00", tag: "Quan trọng", reminder: "15:00", location: "Văn phòng", status: "Hoàn thành" }
    ],
    "15-11-2024": [
        { title: "Xem xét báo cáo", time: "16:00", tag: "Quan trọng", reminder: "15:00", location: "Văn phòng", status: "Đang làm" },
        { title: "Xem xét báo cáo", time: "16:00", tag: "Quan trọng", reminder: "15:00", location: "Văn phòng", status: "Đang làm" },
        { title: "Xem xét báo cáo", time: "16:00", tag: "Quan trọng", reminder: "15:00", location: "Văn phòng", status: "Đang làm" },
        { title: "Xem xét báo cáo", time: "16:00", tag: "Quan trọng", reminder: "08:27", location: "Văn phòng", status: "Đang làm" }
    ]
};
function checkOverdueTasks() {
    const currentDateTime = new Date(); // Lấy thời gian hiện tại
    let overdueCount = 0; // Biến đếm số lượng nhiệm vụ quá hạn

    // Duyệt qua tất cả các nhiệm vụ trong defaultTasks
    for (let dateKey in defaultTasks) {
        const tasks = defaultTasks[dateKey];
        tasks.forEach(task => {
            // Tạo đối tượng Date cho thời gian của nhiệm vụ, sử dụng ngày và giờ của nhiệm vụ
            const taskDueDate = new Date(dateKey.split('-').reverse().join('-') + ' ' + task.time); 
            // Ví dụ: "2024-11-11 10:00" (dùng split để đổi định dạng thành YYYY-MM-DD trước)

            // Kiểm tra nếu ngày giờ của nhiệm vụ đã qua và trạng thái không phải là "hoàn thành"
            if (taskDueDate < currentDateTime && task.status !== "Hoàn thành") {
                task.status = "Quá hạn"; // Cập nhật trạng thái của nhiệm vụ thành "quá hạn"
                overdueCount++; // Tăng số lượng nhiệm vụ quá hạn
            }
        });
    }

    // Hiển thị số lượng nhiệm vụ quá hạn
    displayOverdueTaskCount(overdueCount); 

    // Hiển thị lại các nhiệm vụ sau khi cập nhật trạng thái
    displayTasks(todayFormatted);
}


//Đây là phần tạo nhiệm vụ trong hàm displayTasks() 
function displayTasks(dateKey) {
    const taskContainer = document.getElementById('taskContainer');
    if (!taskContainer) {
        return;  // Dừng thực thi nếu không tìm thấy phần tử
    }
    taskContainer.innerHTML = '';  // Xóa các nhiệm vụ cũ

    const tasks = defaultTasks[dateKey];
    if (tasks) {
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-item');

            const statusIcon = document.createElement('div');
            statusIcon.classList.add('status-icon');

            // Kiểm tra trạng thái và thay đổi hình ảnh
            if (task.status === "Hoàn thành") {
                statusIcon.style.backgroundImage = 'url("Anh_CNPM/tich.png")'; 
            } else {
                statusIcon.style.backgroundImage = 'url("Anh_CNPM/iconcirle.png")'; 
            }

            const starIcon = document.createElement('i');
            starIcon.classList.add('fa-regular', 'fa-star'); 

            if (task.tag === "Quan trọng") {
                starIcon.classList.remove('fa-regular'); 
                starIcon.classList.add('fa-solid', 'fa-star'); 
            }

            const taskTitle = document.createElement('span');
            taskTitle.classList.add('task-title');
            taskTitle.textContent = task.title;

            const taskStatus = document.createElement('span');
            taskStatus.classList.add('task-status');
            taskStatus.textContent = `  ${task.status}`;

            // Tạo phần ghi chú
            const taskNote = document.createElement('span');
            taskNote.classList.add('task-note');
            

            taskElement.appendChild(statusIcon);
            taskElement.appendChild(taskTitle);
            taskElement.appendChild(taskStatus);
            taskElement.appendChild(starIcon);
            taskElement.appendChild(taskNote);

            taskElement.addEventListener('click', function() {
                showTaskDetail(task);
            });

            taskContainer.appendChild(taskElement);
        });
    } else {
        taskContainer.textContent = "Không có nhiệm vụ nào.";
    }
    
}


// Hàm tính tuần hiện tại trong năm
function currentWeek(month, year) {
    const firstDayOfYear = new Date(year, 0, 1);  // Ngày đầu tiên của năm
    const firstDayOfWeek = firstDayOfYear.getDay() || 7;  // Nếu ngày đầu năm là Chủ Nhật, sẽ là 7
    const days = Math.floor((new Date(year, month).getTime() - firstDayOfYear.getTime()) / (24 * 3600 * 1000)) + 1;
    const currentWeek = Math.ceil((days + firstDayOfWeek - 1) / 7);  // Tính số tuần hiện tại
    return currentWeek;
}

function generateCurrentWeekCalendar() {
    const calendar = document.getElementById('newCalendar');
    if (!calendar) {
        console.error('Không tìm thấy phần tử có ID "newCalendar"');
        return; // Nếu không tìm thấy phần tử, dừng hàm
    }
    calendar.style.width = "100%";
    calendar.innerHTML = ''; // Xóa nội dung cũ

    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Tìm ngày trong tuần hiện tại (dựa trên ngày hôm nay)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Chuyển về Chủ Nhật của tuần hiện tại

    // Tạo mảng các ngày trong tuần
    const weekDays = [];
    let currentDayInWeek = startOfWeek;
    while (currentDayInWeek <= endOfWeek) {
        weekDays.push(new Date(currentDayInWeek));
        currentDayInWeek.setDate(currentDayInWeek.getDate() + 1); // Tiến tới ngày kế tiếp
    }

    // Hiển thị tuần
    weekDays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day.getDate();

        dayElement.addEventListener('click', function() {
            if (selectedDayElement) {
                selectedDayElement.classList.remove('selected');
            }
            dayElement.classList.add('selected');
            selectedDayElement = dayElement;

            // Lấy ngày đã chọn theo định dạng 'dd-mm-yyyy'
            const dayFormatted = day.getDate() < 10 ? `0${day.getDate()}` : day.getDate();
            const monthFormatted = (day.getMonth() + 1) < 10 ? `0${day.getMonth() + 1}` : (day.getMonth() + 1);
            const dateKey = `${dayFormatted}-${monthFormatted}-${day.getFullYear()}`;

            // Gọi hàm hiển thị nhiệm vụ
            displayTasks(dateKey);
        });

        // Kiểm tra xem ngày hiện tại có trùng với ngày này không
        if (day.getDate() === currentDay && day.getMonth() === currentMonth && day.getFullYear() === currentYear) {
            dayElement.classList.add('current'); // Thêm lớp 'current' cho ngày hiện tại
            //const circle = document.createElement('div');
            //circle.classList.add('today-circle');
            //circle.textContent = day.getDate(); // Hiển thị số ngày bên trong hình tròn
            //dayElement.innerHTML = ''; // Xóa nội dung cũ
            //dayElement.appendChild(circle); // Thêm hình tròn vào

            // Tự động chọn ngày hiện tại
            dayElement.classList.add('selected');
            selectedDayElement = dayElement;
        }

        calendar.appendChild(dayElement);
    });

    // Cập nhật thông tin tháng và năm
    const monthYearElement = document.getElementById('monthYear');
    if (monthYearElement) {
        monthYearElement.textContent = `Tuần ${currentWeek(currentMonth, currentYear)} - ${currentMonth + 1}/${currentYear}`;
    } else {
        console.error('Không tìm thấy phần tử với ID "monthYear"');
    }
    checkOverdueTasks();
}

// Gọi hàm tạo tuần hiện tại khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    generateCurrentWeekCalendar();
});


// Lấy ngày hiện tại theo định dạng 'dd-mm-yyyy'
const today = new Date();
const todayFormatted = `${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()}-${today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1}-${today.getFullYear()}`;

// Khởi tạo dòng thứ và lịch ban đầu
generateDaysOfWeek();
generateCalendar(currentMonth, currentYear);

// Hiển thị nhiệm vụ của ngày hiện tại
displayTasks(todayFormatted);

// Hiển thị menu
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const menuPanel = document.querySelector('.menu-panel');
    const main = document.querySelector('.main');
    const calendar = document.querySelector('.calendar');
    const daysOfWeek = document.querySelector('.calendar-days-of-week');
    const daysOfMonth = document.querySelector('.new-class-calendar');
    const mission = document.querySelector('.mission');
    const progress = document.querySelector('.progress'); // Tìm phần tử với class 'progress'

    // Nếu có phần tử với class 'progress', mở menu mặc định
    if (progress) {
        if (menuPanel) menuPanel.classList.add('active');
        if (main) main.classList.add('menu-open');
        if (hamburger) hamburger.classList.add('active');
        return; // Dừng hàm để tránh thực thi tiếp bên dưới
    }

    // Đảm bảo `hamburger` và `menuPanel` tồn tại trước khi tiếp tục
    if (hamburger) hamburger.classList.toggle('active');
    if (menuPanel) menuPanel.classList.toggle('active');

    // Điều chỉnh layout khi menu mở
    if (menuPanel && menuPanel.classList.contains('active')) {
        if (main) main.classList.add('menu-open');
        if (calendar) {
            calendar.style.width = 'calc(100% - 350px)';
        } else {
            console.error('Calendar element not found!');
        }
        if (daysOfWeek) daysOfWeek.style.width = 'calc(100% - 350px)';
        if (mission) {
            mission.style.width = 'calc(100% - 450px)';
            mission.style.marginLeft = '350px';
        }
        if (daysOfMonth) {
            daysOfMonth.style.width = 'calc(100% - 350px)';
        } else {
            console.error('daysOfMonth element not found!');
        }
    } else {
        if (main) main.classList.remove('menu-open');
        if (calendar) {
            calendar.style.width = '100%';
        } else {
            console.error('Calendar element not found!');
        }
        if (daysOfWeek) daysOfWeek.style.width = '100%';
        if (daysOfMonth) {
            daysOfMonth.style.width = '100%';
        } else {
            console.error('daysOfMonth element not found!');
        }
        if (mission) {
            mission.style.width = '100%';
            mission.style.margin = 'auto';
        }
    }
}

function toggleAdd() {
    const addPanel = document.querySelector('.add-panel');
    addPanel.classList.toggle('show'); // Thêm hoặc bỏ lớp 'show'
}

document.getElementById('missionInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const missionTitle = event.target.value.trim(); // Lấy tiêu đề nhiệm vụ
        const missionTime = document.getElementById('misstionTime').value.trim(); // Lấy thời gian
        const missionTag = document.getElementById('misstionTag').value.trim(); // Lấy tag
        const missionReminder = document.getElementById('misstionReminder').value.trim(); // Lấy nhắc nhở
        const missionLocation = document.getElementById('misstionLocation').value.trim(); // Lấy địa điểm
        const missionNote = document.getElementById('wrNote').value.trim() || ''; // Lấy ghi chú (nếu trống thì để là chuỗi rỗng)

        if (missionTitle && missionTime && missionTag && missionReminder && missionLocation) {
            // Kiểm tra nếu đã có ngày được chọn
            const selectedDay = selectedDayElement ? selectedDayElement.textContent : null;
            const selectedMonth = currentMonth + 1; // Lấy tháng hiện tại (1-12)
            const selectedYear = currentYear; // Lấy năm hiện tại

            let dateKey;

            if (selectedDay) {
                // Nếu ngày đã được chọn, sử dụng ngày đó
                dateKey = `${selectedDay.padStart(2, '0')}-${selectedMonth.toString().padStart(2, '0')}-${selectedYear}`;
            } else {
                // Nếu không có ngày chọn, sử dụng ngày hiện tại
                const today = new Date();
                const todayDay = today.getDate().toString().padStart(2, '0');
                const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0');
                const todayYear = today.getFullYear();
                dateKey = `${todayDay}-${todayMonth}-${todayYear}`;
            }

            // Tạo đối tượng nhiệm vụ với tất cả các giá trị
            const newMission = {
                title: missionTitle,
                time: missionTime,
                tag: missionTag,
                reminder: missionReminder,
                location: missionLocation,
                note: missionNote, // Thêm ghi chú (có thể là chuỗi rỗng)
                status: "Đang làm" // Thiết lập trạng thái mặc định
            };

            // Nếu ngày đã tồn tại, thêm vào mảng nhiệm vụ của ngày đó, ngược lại tạo mảng mới
            if (!defaultTasks[dateKey]) {
                defaultTasks[dateKey] = [];
            }
            defaultTasks[dateKey].push(newMission);

            // Gọi lại displayTasks để hiển thị nhiệm vụ mới
            displayTasks(dateKey);

            // Xóa nội dung input sau khi thêm
            event.target.value = ''; 
            document.getElementById('misstionTime').value = ''; 
            document.querySelector('input[type="text"]').value = ''; 
            document.getElementById('misstionReminder').value = ''; 
            document.getElementById('misstionLocation').value = ''; 
            document.getElementById('wrNote').value = ''; // Xóa ghi chú

            // Đóng add-panel
            toggleAdd();
        } else {
            alert('Vui lòng điền đầy đủ thông tin.');
        }
        checkOverdueTasks();
    }
});



// Hàm hiển thị chi tiết nhiệm vụ
function showTaskDetail(task) {
    // Hiển thị các chi tiết khác
    document.getElementById('taskDetailTitleInput').value = task.title;
    document.getElementById('taskDetailTimeInput').value = task.time;
    document.getElementById('taskDetailTagInput').value = task.tag;
    document.getElementById('taskDetailReminderInput').value = task.reminder;
    document.getElementById('taskDetailLocationInput').value = task.location;
    document.getElementById('taskDetailStatusInput').value = task.status;

    // Hiển thị ghi chú vào input
    document.getElementById('taskDetailNoteInput').value = task.note || '';  // Nếu không có ghi chú, để trống

    // Lưu nhiệm vụ vào biến tạm để khi lưu có thể truy cập
    window.currentTask = task;

    // Hiển thị bảng chi tiết
    document.getElementById('taskDetailPanel').style.display = 'block';
}

function saveTaskDetail() {
    // Lấy giá trị từ các trường nhập liệu
    const updatedTitle = document.getElementById('taskDetailTitleInput').value;
    const updatedTime = document.getElementById('taskDetailTimeInput').value;
    const updatedTag = document.getElementById('taskDetailTagInput').value;
    const updatedReminder = document.getElementById('taskDetailReminderInput').value;
    const updatedLocation = document.getElementById('taskDetailLocationInput').value;
    const updatedStatus = document.getElementById('taskDetailStatusInput').value;
    const updatedNote = document.getElementById('taskDetailNoteInput').value;  // Lấy giá trị ghi chú mới

    // Cập nhật các trường trong đối tượng nhiệm vụ
    if (window.currentTask) {
        window.currentTask.title = updatedTitle;
        window.currentTask.time = updatedTime;
        window.currentTask.tag = updatedTag;
        window.currentTask.reminder = updatedReminder;
        window.currentTask.location = updatedLocation;
        window.currentTask.status = updatedStatus;
        window.currentTask.note = updatedNote;  // Cập nhật ghi chú
    }

    // Cập nhật lại nhiệm vụ trong `defaultTasks`
    const dateKey = window.currentTask.date;  // Lấy ngày thực tế của nhiệm vụ từ window.currentTask
    let tasksForDate = defaultTasks[dateKey];

    // Kiểm tra nếu tasksForDate chưa tồn tại, tạo mới mảng
    if (!Array.isArray(tasksForDate)) {
        tasksForDate = [];
        defaultTasks[dateKey] = tasksForDate;
    }

    const taskIndex = tasksForDate.findIndex(task => task === window.currentTask);

    if (taskIndex !== -1) {
        tasksForDate[taskIndex] = window.currentTask;  // Cập nhật nhiệm vụ trong danh sách
    } else {
        // Nếu không tìm thấy nhiệm vụ, có thể thêm mới vào danh sách
        tasksForDate.push(window.currentTask);
    }

    // Gọi lại displayTasks để hiển thị nhiệm vụ đã chỉnh sửa
    displayTasks(dateKey);

    // Đóng bảng chi tiết
    closeTaskDetail();
}



// Hàm đóng bảng chi tiết
function closeTaskDetail() {
    document.getElementById('taskDetailPanel').style.display = 'none';
}

function handleKeydown(event) {
    if (event.key === "Enter") {  // Kiểm tra xem phím nhấn có phải là Enter không
        saveTaskDetail();  // Lưu nhiệm vụ
        closeTaskDetail();  // Đóng bảng chi tiết
    }
}

function toVietnamTime(date) {
    // Chuyển đổi thời gian về GMT+7 (UTC+7)
    const vietnamOffset = 7 * 60; // GMT+7 offset in minutes
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000); // chuyển thời gian về UTC
    return new Date(utc + (vietnamOffset * 60000)); // Cộng thêm offset để về giờ Việt Nam
}

function parseTimeToVietnamDate(timeStr) {
    const today = new Date();
    const [hours, minutes] = timeStr.split(':').map(Number);

    // Tạo thời gian với ngày hiện tại và giờ phút từ chuỗi timeStr
    const reminderTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
    return toVietnamTime(reminderTime);  // Đảm bảo chuyển về giờ Việt Nam
}

function displayReminders() {
    const reminderContainer = document.getElementById('reminderContainer');
    if (!reminderContainer) {
        console.error("Phần tử 'reminderContainer' không tồn tại.");
        return;
    }
    reminderContainer.innerHTML = '';  // Xóa các nhắc nhở cũ

    const currentTime = toVietnamTime(new Date());
    const todayDay = currentTime.getDate().toString().padStart(2, '0');
    const todayMonth = (currentTime.getMonth() + 1).toString().padStart(2, '0');
    const todayYear = currentTime.getFullYear();
    const dateKey = `${todayDay}-${todayMonth}-${todayYear}`;

    const tasks = defaultTasks[dateKey];
    let hasReminder = false;  // Biến để kiểm tra nếu có nhiệm vụ nào thỏa mãn

    if (tasks) {
        tasks.forEach(task => {
            const taskReminderTime = parseTimeToVietnamDate(task.reminder);

            if (!isNaN(taskReminderTime)) {
                const reminderWindowStart = new Date(taskReminderTime.getTime() - 5 * 60 * 1000);
                const reminderWindowEnd = new Date(taskReminderTime.getTime() + 5 * 60 * 1000);

                // Kiểm tra điều kiện hiển thị nhiệm vụ trong khoảng thời gian nhắc nhở
                if (task.status === "Đang làm" && currentTime >= reminderWindowStart && currentTime <= reminderWindowEnd) {
                    hasReminder = true;  // Có ít nhất một nhiệm vụ thỏa mãn
                    const reminderElement = document.createElement('div');
                    reminderElement.classList.add('reminder-item');

                    const statusIcon = document.createElement('div');
                    statusIcon.classList.add('status-icon');
                    statusIcon.style.backgroundImage = task.status === "Hoàn thành" ? 
                        'url("Anh_CNPM/tich.png")' : 
                        'url("Anh_CNPM/iconcirle.png")';

                    const starIcon = document.createElement('i');
                    starIcon.classList.add('fa-regular', 'fa-star');
                    if (task.tag === "Quan trọng") {
                        starIcon.classList.remove('fa-regular');
                        starIcon.classList.add('fa-solid', 'fa-star');
                    }

                    const taskTitle = document.createElement('span');
                    taskTitle.classList.add('task-title');
                    taskTitle.textContent = task.title;

                    const taskStatus = document.createElement('span');
                    taskStatus.classList.add('task-status');
                    taskStatus.textContent = `  ${task.status}`;

                    const taskNote = document.createElement('span');
                    taskNote.classList.add('task-note');
                    //taskNote.textContent = task.note || 'Không có ghi chú';

                    reminderElement.appendChild(statusIcon);
                    reminderElement.appendChild(taskTitle);
                    reminderElement.appendChild(taskStatus);
                    reminderElement.appendChild(starIcon);
                    reminderElement.appendChild(taskNote);

                    reminderElement.addEventListener('click', function() {
                        showTaskDetail(task);
                    });

                    reminderContainer.appendChild(reminderElement);
                }
            }
        });
    }

    // Nếu không có nhiệm vụ nào thỏa mãn điều kiện, hiển thị thông báo
    if (!hasReminder) {
        reminderContainer.textContent = "Không có nhiệm vụ nào với reminder hiện tại.";
    }
}

// Gọi hàm khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", function() {
    displayReminders();  // Gọi hàm hiển thị nhắc nhở khi DOM đã tải xong
});

function displayCompletedTaskCount() {
    const completedCountContainer = document.getElementById('completedCountContainer');
    if(!completedCountContainer){
        console.log("Không có completedCountContainer");
        return;
    }
    completedCountContainer.innerHTML = ''; // Xóa nội dung cũ

    let completedCount = 0;

    for (const dateKey in defaultTasks) {
        defaultTasks[dateKey].forEach(task => {
            if (task.status === "Hoàn thành") {
                completedCount++;
            }
        });
    }

    const countDiv = document.createElement('div');
    countDiv.classList.add('completed-count');
    countDiv.textContent = `Số lượng nhiệm vụ/sự kiện hoàn thành: ${completedCount}`;
    
    completedCountContainer.appendChild(countDiv);
}

document.addEventListener("DOMContentLoaded", function() {
    displayCompletedTaskCount();
});

function displayInProgressTaskCount() {
    const inProgressCountContainer = document.getElementById('inProgressCountContainer');
    if(!inProgressCountContainer){
        console.log("Không có inProgressCountContainer");
        return;
    }
    inProgressCountContainer.innerHTML = ''; // Xóa nội dung cũ

    // Lọc nhiệm vụ với status "Đang làm" và đếm
    const inProgressTasks = Object.values(defaultTasks).flat().filter(task => task.status === "Đang làm");
    const count = inProgressTasks.length;

    // Tạo và hiển thị div số lượng nhiệm vụ "Đang làm"
    const countElement = document.createElement('div');
    countElement.textContent = `Số lượng nhiệm vụ/sự kiện Đang làm: ${count}`;
    inProgressCountContainer.appendChild(countElement);
}
document.addEventListener("DOMContentLoaded", function() {
    displayInProgressTaskCount();
});

function displayOverdueTaskCount(count) {
    const overdueCountContainer = document.getElementById('overdueCountContainer');
    if(!overdueCountContainer){
        console.log("Không có overdueCountContainer");
        return;
    }
    overdueCountContainer.innerHTML = ''; // Xóa nội dung cũ

    // Tạo và hiển thị div số lượng nhiệm vụ "Quá hạn"
    const countElement = document.createElement('div');
    countElement.textContent = `Số lượng nhiệm vụ/sự kiện Quá hạn: ${count}`;
    overdueCountContainer.appendChild(countElement);
}
document.addEventListener("DOMContentLoaded", function() {
    checkOverdueTasks(); // Gọi hàm kiểm tra và đếm số lượng nhiệm vụ quá hạn khi trang được tải
});
