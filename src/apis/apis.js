import req from "@/utils/request"

// 1.获取访客信息
export const getfindByPassport = params => req.get('/api/visitors/findByPassport', params);

// 2.查询访客须知	
export const getfindNotice = params => req.get('/api/notice/findNotice', params);

// 3. 上传照片接口
export const uploadImg = params => req.post('/api/visitors/sendAndUp', params);

//	4.发送邮件
export const sendemail = params => req.post('/api/visitors/sendEmail', params);

//	5.获取卡号绑定
export const bindCard = params => req.post('/api/visitors/bindCard', params);

//	6.连接发卡机
export const sendCard = params => req.post('/api/accessCard/sendCard', params);