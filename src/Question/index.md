## Câu hỏi buổi 2

#### 1. Vì sao ở lần chạy đầu tiên hàm Set ko chạy

![alt](../../public/images/Screenshot%202025-10-07%20224441.png)
 - Hàm set tại thời điểm đó chưa làm thay đổi giá trị mail lúc đó, mà nó sẽ cập nhật giá trị mail ở lần render tiếp theo

#### 2. Strictmode là gì và tại sao lại sử dụng Strictmode

    - Strictmode là 1 quy chuẩn nghiêm khắc ở javascript
    - Strictmode được tạo ra để ngăn chặn sử dụng và throw error khi người lập trình thực hiện những xử lý được coi là unsafe; vô hiệu hóa
        các tính năng có thể gây nhầm lẫn hoặc không nên sử dụng, ngăn chặn sử dụng một số từ có thể là keyword trong tương lai
    - React: StrictMode là một công cụ để làm nổi bật các vấn đề tiềm ẩn trong một ứng dụng. Giống như Fragment, StrictMode không render bất kỳ giao diện nào. Nó kích hoạt các kiểm tra mở rộng và cảnh báo bổ sung cho các component con.

![alt text](image.png)
[Tham khảo StrịctMode](https://vi.legacy.reactjs.org/docs/strict-mode.html)
#### 3. How to component con truyền dữ liệu lên component cha 
    - Vì reactjs chỉ có truyền data one-way chỉ 1 đường truyền data từ cha tới con thông qua props, nên muốn con có thể truyền dữ liệu lên cha thì từ cha phải truyền 1 callback function tới component con, mục đích của callback function này là để component con có thể thay đổi một phần state của component cha
    - con có thể truyền dữ liệu lên cha thông qua state = callback function
#### 4. 7 layers trong feature-sliced design là gì? Và làm sao để áp dụng vào dự án hiện tại của bạn?
- App: 
- Processes(deprecated)
- Pages
- Widgets
- Features
- Entities
- Shared
![alt text](image-1.png)
#### 5. Tại sao sử dụng axios mà k dùng fetch . ưu và nhược điểm axios
- Axios là một thưu viện của js hỗ trợ để tạo request HTTP
- Ưu điểm: 
    User truyền data vào request hay nhận data từ response thì data luôn tự động convert., do đó không cần phải thêm các method khác.
    Việc xử lý lỗi rất dễ dàng vì Axios cho phép bắn lỗi network. Nếu đó là một bad response như 404, promise sẽ được bỏ qua và sẽ trả về một error. Do đó, ta cần catch error đấy.
    Hỗ trợ promise API
    Hỗ trợ interceptors: thực hiện các tác vụ như thêm tiêu đề, xử lý lỗi, thêm hoặc xóa thông tin từ yêu cầu và phản hồi, và nhiều tác vụ khác.
#### 6. Các loại storage trong trình duyệt, khái niệm và cách sử dụng 
- Local storage: 
    + Khả năng lưu trữ vô thời hạn: chỉ bị xóa bằng js, xóa bằng bộ nhớ trình duyệt hoặc xóa bằng localStorageAPI
    + Không gửi thông tin lên server như COOKIE nên bảo mật hơn 
- Session Storage : 
    + Lưu trữ trên client: cũng giống như local storage thì session storage cũng dùng để lưu trữ dữ liệu trên trình duyệt của khách truy cập 
    + Mất dữ liệu khi đóng tab 
    + Dữ liệu không được gửi lên server 
    + Thông tin lưu trữ nhiều hơn cookie
- Cookie
    + Thông tin được gửi lên server 
    + Cookie là chủ yếu đọc ở máy chủ, localStorage và SessionStorage đọc ở máy khách 
    + Có thời gian sống: thời gian timeout nhất định do dev quy định 
#### 7. UseEffect
- dependencies
    + array rỗng [] => chỉ chạy một lần khi mount 