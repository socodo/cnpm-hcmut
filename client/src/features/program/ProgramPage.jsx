import React, { useEffect } from "react";
import ProgramForm from "./ProgramForm";
import styles from "./styles.module.css";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProgramPage() {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Đăng ký chương trình Mentoring – HKI 2025–2026</h1>
        <p className={styles.subtitle}>
          Thông tin sinh viên được đồng bộ từ hệ thống SSO. Vui lòng điền nhu
          cầu và vấn đề bạn muốn được mentor hỗ trợ.
        </p>
        <div className={styles.notice}>
          <span>🗓️</span>
          <div>
            <strong>Lưu ý:</strong> Form đăng ký sẽ đóng vào ngày 31/10/2025
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
                user.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString("vi-VN")
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
              value={`Sinh viên Năm: ${user?.student?.year}`}
            />
            <input
              placeholder="GPA"
              className={styles.input}
              readOnly
              value={`GPA: ${user?.student?.gpa}/10`}
            />
          </div>
        </div>

        <ProgramForm />
      </main>
    </div>
  );
}
