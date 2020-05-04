# Chat Application

## Các chức năng chính
**1. Chat trong nhóm (hai người trở lên):** Người dùng có thể xem tin nhắn, nói chuyện với các thành viên trong nhóm, có thể xem thông tin về nhóm và những người tham gia nhóm. Họ có thể join bất kì nhóm nào mình thích và rời khỏi nhóm.

**2: Trả lời tin nhắn:** Người dùng có thể tạo thread bằng cách reply tin nhắn.

**3: Đính kèm ảnh trong tin nhắn:** Người dùng có thể đính kèm ảnh trong tin nhắn của mình.

**3. Đăng nhập / Đăng ký/ Khôi phục tài khoản :** Người dùng có thể đăng nhập bằng email và mật khẩu để giữ cuộc nói chuyện riêng tư. Mỗi tài khoản trên hệ thống là duy nhất. Khi quên mật khẩu,người dùng có thể khôi phục lại được.

## Cơ sở dữ liệu
![Các bảng dữ liệu chính](https://i.imgur.com/BhAzQmY.png)
Bảng dữ liệu chính

**1. Bảng user (Người dùng):** Chứa các thông tin của người dùng gồm id, name, email, password.

**2. Bảng channel (Các kênh người dùng tham gia):** Chứa các thông tin bao gồm id của channel, thời gian tạo.

**3. Bảng channel_member:** Là bảng chứa thông tin người dùng của các channel, gồm id của người dùng, và id của channel mà người dùng tham gia.

**4. Bảng message:** Là bảng chứa thông tin tin nhắn của người dùng bao gồm id của tin nhắn, nội dung tin nhắn, thời gian tạo, thuộc channel nào và do người dùng nào gửi.

**5. Bảng file:** Là bảng chứa thông tin về những file đã được upload và lưu trữ ở trên server. Bao gồm tên thật của file (name), đường dẫn (path), loại file (type), kích cỡ file (size), ngày tạo ra file và ngày update file.

## Project setup
```
npm install
```

### Start backend server
```
npm start
```
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
