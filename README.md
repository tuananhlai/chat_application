# Slack Clone

Trong thời gian gần đây, làm việc từ xa đã trở nên cần thiết với nhiều công ty và tổ chức. Để đáp ứng nhu cầu giao tiếp qua mạng ngày càng tăng này, rất nhiều ứng dụng nhắn tin đã được phát triển, điển hình là Telegram, Skype, Slack, Microsoft Teams,...

Ứng dụng này được phát triển với mục đích tái tạo lại chức năng của Slack, một ứng dụng đa nền tảng cho việc giao tiếp và hợp tác từ xa. Ứng dụng cho phép người dùng nhắn tin theo thời gian thực và cung cấp nhiều phương thức gửi tin nhắn để phù hợp với nhu cầu sử dụng của những người dùng khác nhau.

[Demo App](https://chat-application-uet.herokuapp.com/)

![Demo](https://i.imgur.com/jAmxGY8.gif)

## Mục lục

- [Yêu cầu chức năng](#functional-requirements)

- [Yêu cầu phi chức năng](#non-functional-requirements)

- [Thiết kế cơ sở dữ liệu](#database-design)

- [Cài đặt tại local](#setup)

- [Mở rộng](#potential)

- [Thành viên nhóm](#project-members)

## Yêu cầu chức năng <a id="functional-requirements"></a>

### Đăng nhập, đăng ký, cập nhật mật khẩu

Người dùng có thể đăng ký tài khoản bằng cách cung cấp tên, email và mật khẩu. Nếu thông tin đăng kí là hợp lệ (email không bị trùng và mật khẩu đủ dài), người dùng có thể sử dụng thông tin đó để đăng nhập và sử dụng trang web.

Ngoài ra, người dùng có thể cập nhật mật khẩu bất cứ lúc nào. Khi cập nhật mật khẩu, người dùng cần cung cấp mật khẩu hiện tại và mật khẩu mới. Server sẽ xác định tính hợp lệ của mật khẩu cũ và thay đổi mật khẩu theo yêu cầu của người dùng.

| Chức năng                                | Câu lệnh                                                     |
| ---------------------------------------- | ------------------------------------------------------------ |
| Truy vấn thông tin người dùng bằng email | `SELECT id, name, email FROM user WHERE email = ?;`          |
| Đăng ký người dùng                       | `INSERT INTO user (name, email, password) VALUES (?, ?, ?);` |
| Cập nhật mật khẩu                        | `UPDATE user SET password = ? WHERE user.id = ?;`            |

#### Tạo tài khoản mới

![Create account](https://i.imgur.com/uG4Ha8l.gif)

#### Đăng nhập bằng tài khoản vừa tạo

![Login with created account](https://i.imgur.com/Ms2BFZj.gif)

#### Cập nhật lại mật khẩu

![Update password](https://i.imgur.com/lGOsUAD.gif)

### Trò chuyện theo kênh

Người dùng có thể tạo kênh trò chuyện để có thể nhắn tin với người dùng khác. Tất cả người trong cùng một kênh trò chuyện có thể xem lịch sử tin nhắn, xem thông tin về kênh và thành viên ở trong kênh trò chuyện. Người dùng cũng có thể tham gia và rời khỏi kênh trò chuyện theo ý muốn.

| Chức năng                                | Câu lệnh                                                                                                                                                                                           |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Truy vấn toàn bộ kênh                    | `SELECT * FROM channel;`                                                                                                                                                                           |
| Truy vấn tin nhắn trong kênh             | `SELECT message.* FROM message WHERE channel_id = ?;`                                                                                                                                              |
| Truy vấn kênh mà một người dùng tham gia | `SELECT channel.* FROM channel INNER JOIN channel_member ON channel.id = channel_member.channel_id INNER JOIN user ON channel_member.user_id = user.id AND user.id = ?;`                           |
| Truy vấn thành viên trong một kênh       | `SELECT user.id, user.name, user.email FROM channel INNER JOIN channel_member ON channel.id = channel_member.channel_id INNER JOIN user ON channel_member.user_id = user.id WHERE channel_id = ?;` |
| Truy vấn kênh người dùng không tham gia  | `select channel.* from channel where id not in (select channel.id from channel_member inner join channel on channel_member.channel_id = channel.id and channel_member.user_id = ?);`               |
| Người dùng tham gia vào kênh             | `INSERT INTO channel_member (user_id, channel_id) VALUES (?, ?);`                                                                                                                                  |
| Người dùng thoát khỏi kênh               | `DELETE FROM channel_member WHERE user_id = ? AND channel_id = ?;`                                                                                                                                 |
| Tạo kênh mới                             | `INSERT INTO channel (name, description) VALUES (?, ?);`                                                                                                                                           |

![Demo](https://i.imgur.com/jAmxGY8.gif)

### Trò chuyện riêng tư

Ngoài nhắn tin trong kênh cho nhiều người, người dùng có thể nhắn tin riêng tư với một người dùng khác. Chỉ hai người mới có thể gửi và đọc tin nhắn của nhau.

| Chức năng                                          | Câu lệnh                                                                                                                                               |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Truy vấn cuộc trò chuyện của người dùng            | `SELECT sender_id from personal_message where receiver_id = ?) union (select receiver_id from personal_message where sender_id = ?;`                   |
| Truy vấn tin nhắn của cuộc trò chuyện giữa 2 người | `SELECT * FROM personal_message WHERE (sender_id = [user_id] AND receiver_id = [partner_id]) OR sender_id = [partner_id] AND receiver_id = [user_id];` |

![Private chat](https://i.imgur.com/YoX7iT3.gif)

### Gửi tin nhắn chữ và gửi file

Trang web hỗ trợ gửi tin nhắn chứa kí tự đặc biệt và emoji nhờ áp dụng bảng mã kí tự UTF-8 cho cơ sở dữ liệu. Ngoài tin nhắn chữ thường, người dùng có thể đính kèm file để gửi cho đối phương<sup>1</sup>.

1. Do cách thức hoạt động của Heroku, toàn bộ file được upload lên server Heroku sẽ bị xóa sau 30 phút.

| Chức năng                         | Câu lệnh                                                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Thêm tin nhắn vào kênh            | `INSERT INTO message (content, sender_id, channel_id, attachment_id, master_message_id) VALUES (?, ?, ?, ?, ?);` |
| Truy vấn file đính kèm tin nhắn   | `SELECT file.* from message inner join file on message.attachment_id = file.id WHERE message.id = ?;`            |
| Lưu thông tin file sau khi upload | `INSERT INTO file (name, path, type, size) VALUES (?, ?, ?, ?);`                                                 |

#### Gửi file

![Send file](https://i.imgur.com/gEOu0jJ.gif)

### Trả lời tin nhắn

Trong cuộc trò chuyện, người dùng có thể bắt đầu cuộc thảo luận về một vấn đề bằng cách trả lời một tin nhắn bất kì trong cuộc trò chuyện. Bằng cách như vậy, tin nhắn cùng chủ đề sẽ được lưu trong cùng một cuộc thảo luận và lịch sử tin nhắn sẽ gọn gàng hơn.

| Chức năng                             | Câu lệnh                                                                          |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| Truy vấn tin nhắn cha và tin nhắn con | `SELECT * FROM message m1 INNER JOIN message m2 ON m1.id = m2.master_message_id;` |
| Truy vấn reply của một tin nhắn       | `SELECT * FROM message WHERE master_message_id = ?;`                              |

![Reply](https://i.imgur.com/tgaP2JP.gif)

### Tìm kiếm tin nhắn trong kênh

Người dùng có thể tìm kiếm một tin nhắn trong cuộc trò chuyện bằng từ khóa. Bằng việc sử dụng `FULLTEXT INDEX` cho cột nội dung tin nhắn, thao tác tìm kiếm sẽ trả về kết quả liên quan hơn và hiệu quả hơn so với việc sử dụng toán tử `LIKE`.

| Chức năng                      | Câu lệnh                                                                            |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| Tìm kiếm tin nhắn theo từ khóa | `SELECT * FROM message WHERE MATCH (content) AGAINST (? in natural language mode);` |

![Find message](https://i.imgur.com/uD7LwHT.gif)

## Yêu cầu phi chức năng <a id="non-functional-requirements"></a>

### Đảm bảo tính bảo mật

Trang web sử dụng Web Token để đảm bảo chỉ người dùng có quyền hạn mới có thể truy cập các thông tin và thực hiện thao tác như đổi mật khẩu, gửi tin nhắn, tham gia vào kênh,... Ngoài ra, trang web sử dụng Local Storage để lưu trữ token của người dùng, giúp giảm số lần phải nhập mật khẩu.

Mật khẩu của người dùng đều được mã hóa bằng thư viện bcrypt trước khi được thêm vào cơ sở dữ liệu. Bằng cách này, những người có quyền truy cập cơ sở dữ liệu cũng không thể xem được mật khẩu, giúp tăng tính bảo mật của trang web.

Thông tin liên quan trực tiếp đến bảo mật thông tin như tên và mật khẩu cơ sở dữ liệu, mã bí mật cho Web Token đều được lưu dưới dạng biến môi trường trên Heroku. String do người dùng nhập đều được escape để tránh lỗi SQL Injection.

### Hiệu năng tốt, thời gian chờ đợi ngắn

Với việc gửi tin nhắn thời gian thực, trang web sử dụng thư viện [socket.io](https://socket.io/) để truyền tin nhắn giữa các kênh và cuộc trò chuyện riêng tư. Thư viện [socket.io](https://socket.io/) se chuyển đổi giao thức truyền tin một cách động để quá trình truyền tin trở nên tin cậy và ổn định với các tốc độ mạng khác nhau.

## Thiết kế cơ sở dữ liệu <a id="database-design"></a>

### Thiết kế ER

![ER Diagram](https://i.imgur.com/CN80DL8.png)

### Thiết kế bảng trong cơ sở dữ liệu

![MySQL Model](https://i.imgur.com/4vvRIcl.png)

- Bảng user: Lưu trữ thông tin người dùng.

- Bảng channel: Lưu trữ thông tin về kênh trò chuyện.

- Bảng message: Lưu trữ tin nhắn được gửi trong kênh trò chuyện.

- Bảng personal_message: Lưu trữ tin nhắn được gửi trực tiếp giữa 2 người dùng. Ngoài lưu trữ tin nhắn, bảng được sử dụng để truy vấn những cuộc trò chuyện riêng tư của người dùng.

- Bảng file: Lưu trữ các file được upload lên server.

- Bảng channel_member: Lưu trữ thông tin về thành viên của kênh trò chuyện.

## Cài đặt tại local <a id="setup"></a>

Trước khi cài đặt tại local, đảm bảo bạn có Node.js v12.0.0 hoặc mới hơn, npm v6.13.0 hoặc mới hơn.

Cài đặt dependency

```sh
npm install
```

Chạy development server cho phía client

```sh
npm run serve
```

Chạy development server cho phía server

```sh
npm start
```

## Mở rộng <a id="potential"></a>

- Hiển thị trạng thái active của người dùng.

- Cho phép tạo workspace riêng cho từng tổ chức.

- Sử dụng dịch vụ bên thứ 3 để lưu trữ file của người dùng.

- Thông báo khi có tin nhắn mới.

- Tăng hiệu năng hệ cơ sở dữ liệu bằng cách cài đặt sao lưu và phân đoạn bảng.

## Thành viên nhóm <a id="project-members"></a>

| Thành viên   | Mã số sinh viên | Email               |
| ------------ | --------------- | ------------------- |
| Đỗ Quang Anh | 18020136        | 18020136@vnu.edu.vn |
| Lại Tuấn Anh | 18020117        | 18020117@vnu.edu.vn |
