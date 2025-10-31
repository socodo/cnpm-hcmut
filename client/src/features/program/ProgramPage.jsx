import React from 'react'
import ProgramForm from './ProgramForm'
import styles from './styles.module.css'

export default function ProgramPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Đăng ký chương trình Mentoring – HKI 2025–2026</h1>
        <p className={styles.subtitle}>
          Thông tin sinh viên được đồng bộ từ hệ thống SSO. Vui lòng điền nhu cầu và vấn đề bạn muốn được mentor hỗ trợ.
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
            <input placeholder="Họ và tên" className={styles.input} readOnly value="Nguyễn Văn An" />
            <input placeholder="Mã số sinh viên (MSSV)" className={styles.input} readOnly value="2152001" />
            <input placeholder="Email" className={styles.input} readOnly value="an.nguyen@hcmut.edu.vn" />
            <input placeholder="Khoa/Ngành" className={styles.input} readOnly value="Khoa Khoa học và Kỹ thuật Máy tính" />
            <input placeholder="Năm học" className={styles.input} readOnly value="Năm 3" />
            <input placeholder="GPA" className={styles.input} readOnly value="3.20 / 4.00" />
          </div>
        </div>

        <ProgramForm />

      </main>
    </div>
  )
}
