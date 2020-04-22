## Các chức năng chính
**1. Chat giữa hai người:** Hai người dùng có thể nhắn tin riêng với nhau. Nội dung tin nhắn có thể bao gồm chữ, ảnh và file (giới hạn dung lượng). Nội dung cuộc trò chuyện chỉ có hai người biết. Người dùng có thể reply tin nhắn của người dùng khác.

**2. Chat trong nhóm (hai người trở lên):** Người dùng có thể xem, tìm kiếm thành viên và mời người khác vào nhóm trò chuyện của mình. Chức năng của nhóm tương tự như trò chuyện hai người.

**3. Đăng nhập / Đăng ký/ Khôi phục tài khoản :** Người dùng có thể đăng nhập bằng email và mật khẩu để giữ cuộc nói chuyện riêng tư. Mỗi tài khoản trên hệ thống là duy nhất. Khi quên mật khẩu,người dùng có thể khôi phục lại được.

## Cơ sở dữ liệu
![Các bảng dữ liệu chính](https://i.imgur.com/BhAzQmY.png)
Bảng dữ liệu chính

**1. Bảng user (Người dùng):** Chứa các thông tin của người dùng gồm id, name, email, password.

**2. Bảng channel (Các kênh người dùng tham gia):** Chứa các thông tin bao gồm id của channel, thời gian tạo.

**3. Bảng channel_member:** Là bảng chứa thông tin người dùng của các channel, gồm id của người dùng, và id của channel mà người dùng tham gia.

**4. Bảng message:** Là bảng chứa thông tin tin nhắn của người dùng bao gồm id của tin nhắn, nội dung tin nhắn, thời gian tạo, thuộc channel nào và do người dùng nào gửi.


