import React, { useEffect, useState } from "react";
import ProgramForm from "./ProgramForm";
import styles from "./styles.module.css";
import { useAuthStore } from "@/store/useAuthStore";
import { adminService } from "@/service/admin.service";

export default function ProgramPage() {
  const user = useAuthStore((state) => state.user);
  const [activeSemester, setActiveSemester] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchActiveSemester();
  }, []);

  const fetchActiveSemester = async () => {
    try {
      const res = await adminService.getActiveSemester();
      if (res.data && res.success) {
        setActiveSemester(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch active semester:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Đang tải thông tin học kỳ...</div>;
  }

  if (!activeSemester) {
    return (
      <div className={styles.page}>
        <div className="p-8 text-center text-red-500">
          Hiện tại không có học kỳ nào đang mở đăng ký.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Đăng ký chương trình Mentoring – {activeSemester.name}</h1>
        <p className={styles.subtitle}>
          Thông tin sinh viên được đồng bộ từ hệ thống SSO. Vui lòng điền nhu
          cầu và vấn đề bạn muốn được mentor hỗ trợ.
        </p>
        <div className={styles.notice}>
          <span>🗓️</span>
          <div>
            <strong>Lưu ý:</strong> Form đăng ký sẽ đóng vào ngày{" "}
            {new Date(activeSemester.endDateSurvey).toLocaleDateString("vi-VN")}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.card}>
          <h2>Thông tin sinh viên</h2>
          <div className={styles.grid}>
            <input
              placeholder="Họ và tên"
              className={styles.input}
              readOnly
              value={user?.displayName}
            />
            <input
              placeholder="Mã số sinh viên (MSSV)"
              className={styles.input}
              readOnly
              value={
                user?.dateOfBirth
                  ? new Date(user?.dateOfBirth).toLocaleDateString("vi-VN")
                  : ""
              }
            />
            <input
              placeholder="Email"
              className={styles.input}
              readOnly
              value={user?.email}
            />
            <input
              placeholder="Khoa/Ngành"
              className={styles.input}
              readOnly
              value={user?.student?.faculty}
            />
            <input
              placeholder="Năm học"
              className={styles.input}
              readOnly
              value={`Sinh viên Năm: ${user?.student?.year || ""}`}
            />
            <input
              placeholder="GPA"
              className={styles.input}
              readOnly
              value={`GPA: ${user?.student?.gpa || ""}`}
            />
          </div>
        </div>

        <ProgramForm semester={activeSemester} />
      </main>
    </div>
  );
}
