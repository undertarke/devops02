// src/utils/auth.js

export const getCurrentUserRole = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.warn("Token not found");
    return null;
  }

  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    console.log("Decoded payload:", decodedPayload); // LOG QUAN TRỌNG
    return decodedPayload.role || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const getCurrentUserRoles = () => {
  const authData = localStorage.getItem("authData");
  if (!authData) return [];
  
  try {
    const parsedAuthData = JSON.parse(authData);
    return parsedAuthData.roles || [];
  } catch (error) {
    console.error("Error parsing auth data:", error);
    return [];
  }
};

export const isAdminUser = () => {
  const roles = getCurrentUserRoles();
  const adminRoles = ['Admin', 'Doctor', 'Accountant'];
  return roles.some(role => adminRoles.includes(role));
};

export const isTokenExpired = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Error checking token expiration:", error);
    return true;
  }
};

// Lưu thời gian hết hạn token (3 tiếng từ thời điểm login)
export const setTokenExpiration = () => {
  const expirationTime = Date.now() + (3 * 60 * 60 * 1000); // 3 tiếng
  localStorage.setItem('tokenExpiration', expirationTime.toString());
};

// Kiểm tra token có hết hạn dựa trên thời gian đã lưu
export const isTokenExpiredByTime = () => {
  const expirationTime = localStorage.getItem('tokenExpiration');
  if (!expirationTime) return true;
  
  return Date.now() > parseInt(expirationTime);
};

// Xóa token và thông tin auth
export const clearAuthData = () => {
  localStorage.removeItem('authData');
  localStorage.removeItem('authToken');
  localStorage.removeItem('tokenExpiration');
};

// Xử lý khi token hết hạn với logic redirect khác nhau
export const handleTokenExpiration = () => {
  const currentPath = window.location.pathname;
  const isOnAdminPage = currentPath.startsWith('/admin');
  
  clearAuthData();
  
  if (isOnAdminPage) {
    // Nếu đang ở trang admin -> redirect tới trang login
    alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    window.location.href = "/login";
  } else {
    // Nếu đang ở trang user -> chỉ clear token, không redirect
    console.log("Token đã hết hạn, đã xóa thông tin đăng nhập.");
    window.location.reload(); // Reload để cập nhật UI
  }
};

// Kiểm tra token và thực hiện callback hoặc xử lý hết hạn
export const checkTokenAndProceed = async (callback) => {
  if (isTokenExpired() || isTokenExpiredByTime()) {
    handleTokenExpiration();
    return;
  }
  
  try {
    await callback();
  } catch (error) {
    if (error.response?.status === 401) {
      handleTokenExpiration();
    } else {
      throw error;
    }
  }
};

// Khởi tạo kiểm tra token định kỳ
export const initTokenExpirationCheck = () => {
  // Kiểm tra mỗi phút
  const interval = setInterval(() => {
    if (isTokenExpiredByTime()) {
      handleTokenExpiration();
      clearInterval(interval);
    }
  }, 60000); // 1 phút

  return interval;
};
