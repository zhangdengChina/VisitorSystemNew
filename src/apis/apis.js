import req from "@/utils/request"

// 1.获取访客信息
export const getfindByPassport = params => req.get('/api/visitors/findByPassport', params);

// 2.查询访客须知	
export const getfindNotice = params => req.get('/api/notice/findNotice', params);

// 3. 上传照片接口
export const uploadImg = params => req.post('/api/visitors/sendAndUp', params);