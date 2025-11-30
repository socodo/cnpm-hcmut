import React, { useState, useEffect } from "react";
import { adminService } from "@/service/admin.service";

export default function UsersTab() {
  // Users - fetch từ API
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

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

  return (
    <div>
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

        <div className="mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm kiếm theo tên hoặc email..."
            className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-200 bg-gray-50"
          />
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
