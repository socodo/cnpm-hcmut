import React, { useState, useEffect } from "react";
import { adminService } from "@/service/admin.service";
import { authService } from "@/service/auth.service";
import { toast } from "react-toastify";

export default function UsersTab() {
  // Users - fetch từ API
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    sex: "",
    roles: ["STUDENT"],
  });

  // Generate random password function
  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  // Auto-generate password when modal opens
  useEffect(() => {
    if (showCreateModal) {
      setFormData(prev => ({
        ...prev,
        password: generateRandomPassword()
      }));
    }
  }, [showCreateModal]);

  // Fetch users khi component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllUsers();
      if (response.success) {
        // Map data từ API sang format hiển thị
        const mappedUsers = response.data.map((user) => ({
          id: user._id,
          name: user.displayName,
          email: user.email,
          role: user.roles?.includes("TUTOR") ? "tutor" : "student",
          status: user.status === "ACTIVE" ? "Hoạt động" : "Đã chặn",
          originalStatus: user.status,
        }));
        setUsers(mappedUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });

  const toggleUserBlock = async (id) => {
    try {
      const user = users.find((u) => u.id === id);
      if (!user) return;

      const newStatus = user.originalStatus === "ACTIVE" ? "BANNED" : "ACTIVE";

      setLoading(true);
      const response = await adminService.updateUserStatus(id, newStatus);

      if (response.success) {
        // Cập nhật state local
        setUsers((prev) =>
          prev.map((u) =>
            u.id === id
              ? {
                ...u,
                status: newStatus === "ACTIVE" ? "Hoạt động" : "Đã chặn",
                originalStatus: newStatus,
              }
              : u
          )
        );
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái người dùng");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!formData.displayName || !formData.email || !formData.password) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    try {
      setLoading(true);
      const response = await authService.signup(formData);

      if (response.success) {
        toast.success("Tạo người dùng thành công");
        setShowCreateModal(false);
        setFormData({
          displayName: "",
          email: "",
          password: "",
          phone: "",
          dateOfBirth: "",
          sex: "",
          roles: ["STUDENT"],
        });
        fetchUsers();
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(error.response?.data?.message || "Tạo người dùng thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleToggle = (role) => {
    setFormData(prev => {
      const roles = prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role];
      return { ...prev, roles };
    });
  };

  return (
    <div>
      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Tạo người dùng mới</h2>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Họ tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">
                    Mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={formData.password}
                      className="flex-1 px-3 py-2 border rounded-lg bg-gray-100"
                      required
                      readOnly
                      disabled
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, password: generateRandomPassword() })}
                      className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium"
                    >
                      🔄 Tạo mới
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Mật khẩu ngẫu nhiên 8 ký tự sẽ được gửi qua email người dùng</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ngày sinh</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Giới tính</label>
                  <select
                    value={formData.sex}
                    onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="Male">Nam</option>
                    <option value="Female">Nữ</option>
                    <option value="Other">Khác</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Vai trò <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.roles.includes("STUDENT")}
                      onChange={() => handleRoleToggle("STUDENT")}
                      className="mr-2"
                    />
                    Sinh viên
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.roles.includes("TUTOR")}
                      onChange={() => handleRoleToggle("TUTOR")}
                      className="mr-2"
                    />
                    Giảng viên
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  disabled={loading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Đang tạo..." : "Tạo người dùng"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mr-4">
              👥
            </div>
            <div>
              <div className="text-2xl font-bold">
                {users.filter((u) => u.role === "student").length}
              </div>
              <div className="text-sm text-gray-600">Sinh viên</div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mr-4">
              🧑‍🏫
            </div>
            <div>
              <div className="text-2xl font-bold">
                {users.filter((u) => u.role === "tutor").length}
              </div>
              <div className="text-sm text-gray-600">Giảng viên</div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center">
            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mr-4">
              🚫
            </div>
            <div>
              <div className="text-2xl font-bold">
                {users.filter((u) => u.status === "Đã chặn").length}
              </div>
              <div className="text-sm text-gray-600">Đã chặn</div>
            </div>
          </div>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên hoặc email..."
            className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50"
          />
          <button
            onClick={() => setShowCreateModal(true)}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            + Tạo người dùng
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-sm text-gray-600 border-b">
                <th className="py-3 px-4">Tên</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Vai trò</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="border-b last:border-b-0">
                  <td className="py-4 px-4">{u.name}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {u.email}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-3 py-1 text-sm rounded-full ${u.role === "tutor"
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {u.role === "tutor" ? "Giảng viên" : "Sinh viên"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-3 py-1 text-sm rounded-full ${u.status === "Hoạt động"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                        }`}
                    >
                      {u.status === "Hoạt động" ? "Hoạt động" : "Đã chặn"}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {u.status === "Hoạt động" ? (
                      <button
                        onClick={() => toggleUserBlock(u.id)}
                        className="px-3 py-1 rounded-lg border border-red-200 text-red-600"
                      >
                        🚫 Chặn
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleUserBlock(u.id)}
                        className="px-3 py-1 rounded-lg border border-green-200 text-green-600"
                      >
                        ✅ Mở chặn
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
