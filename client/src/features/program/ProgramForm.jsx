import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { validateProgram, validateField } from "@/validate/program.validate";
import { adminService } from "@/service/admin.service";
import { userService } from "@/service/user.service";
import { toast } from "react-toastify";

export default function ProgramForm({ semester }) {
  const [data, setData] = useState({
    subject: "",
    problem: "",
    preferredMode: "",
    sessionType: "",
    reason: "",
    personalGoal: "",
    adminNote: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const maxChars = 500;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((p) => ({ ...p, [name]: value }));

    // validate single field
    try {
      const res = validateField(name, value);
      if (res.success) {
        setErrors((p) => ({ ...p, [name]: undefined }));
      } else {
        setErrors((p) => ({ ...p, [name]: res.error.issues[0].message }));
      }
    } catch (err) {
      // ignore
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = validateProgram(data);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((i) => {
        fieldErrors[i.path[0]] = i.message;
      });
      setErrors(fieldErrors);

      const first = Object.keys(fieldErrors)[0];
      document.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});

    try {
      setSubmitting(true);
      const payload = {
        semesterId: semester._id,
        problem: data.subject,
        problemDetail: data.problem,
        preferredMode: data.preferredMode,
        sessionType: data.sessionType,
        reason: data.reason,
        learningGoals: data.personalGoal,
      };

      const res = await userService.postProgram(payload);
      if (res.data && res.success) {
        toast.success("Đăng ký thành công!");
        setData({
          subject: "",
          problem: "",
          preferredMode: "",
          sessionType: "",
          reason: "",
          personalGoal: "",
          adminNote: "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit} noValidate>
      {/* Vấn đề - môn học cần hỗ trợ */}
      <h2>Vấn đề - môn học cần hỗ trợ</h2>
      <p className={styles.hint}>Các trường có dấu * là bắt buộc</p>

      <label className={styles.block}>
        <div className={styles.label}>* Môn học cần hỗ trợ</div>
        <input
          type="text"
          name="subject"
          value={data.subject}
          onChange={handleChange}
          className={`${styles.input} ${errors.subject ? styles.inputInvalid : ""
            }`}
          placeholder="Nhập tên môn học"
          required
        />
        {errors.subject && (
          <div className={styles.fieldError}>{errors.subject}</div>
        )}
      </label>

      <label className={styles.block}>
        <div className={styles.label}>* Vấn đề cụ thể</div>
        <div className={styles.textareaWrap}>
          <textarea
            name="problem"
            placeholder='VD: "Em gặp khó khăn trong lập trình đệ quy và cấu trúc cây."'
            className={`${styles.textarea} ${errors.problem ? styles.inputInvalid : ""
              }`}
            value={data.problem}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) handleChange(e);
            }}
            maxLength={maxChars}
            required
          />
          <div className={styles.counter}>
            {data.problem.length}/{maxChars} ký tự
          </div>
        </div>
        {errors.problem && (
          <div className={styles.fieldError}>{errors.problem}</div>
        )}
      </label>

      <div className={styles.sep} />

      {/* Nhu cầu mentoring */}
      <h2>Nhu cầu mentoring</h2>
      <p className={styles.hint}>Thông tin về hình thức và mục đích học tập</p>

      <div className={styles.row}>
        <label style={{ flex: 1 }}>
          <div className={styles.label}>* Hình thức mong muốn</div>
          <select
            name="preferredMode"
            value={data.preferredMode}
            onChange={handleChange}
            className={`${styles.select} ${errors.preferredMode ? styles.inputInvalid : ""
              }`}
            required
          >
            <option value="" disabled hidden>
              Chọn hình thức
            </option>
            <option value="ONLINE">Online</option>
            <option value="OFFLINE">Offline</option>
          </select>
          {errors.preferredMode && (
            <div className={styles.fieldError}>{errors.preferredMode}</div>
          )}
        </label>

        <label style={{ flex: 1 }}>
          <div className={styles.label}>* Kiểu mentoring</div>
          <select
            name="sessionType"
            value={data.sessionType}
            onChange={handleChange}
            className={`${styles.select} ${errors.sessionType ? styles.inputInvalid : ""
              }`}
            required
          >
            <option value="" disabled hidden>
              Chọn kiểu mentoring
            </option>
            <option value="ONE_ON_ONE">1-1</option>
            <option value="GROUP">Nhóm</option>
          </select>
          {errors.sessionType && (
            <div className={styles.fieldError}>{errors.sessionType}</div>
          )}
        </label>
      </div>

      <label className={styles.block}>
        <div className={styles.label}>* Lý do cần mentoring</div>
        <div className={styles.textareaWrap}>
          <textarea
            name="reason"
            placeholder="VD: Em muốn cải thiện điểm cuối kỳ hoặc học sâu hơn phần thuật toán."
            className={`${styles.textarea} ${errors.reason ? styles.inputInvalid : ""
              }`}
            value={data.reason}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) handleChange(e);
            }}
            maxLength={maxChars}
            required
          />
          <div className={styles.counter}>
            {data.reason.length}/{maxChars} ký tự
          </div>
        </div>
        {errors.reason && (
          <div className={styles.fieldError}>{errors.reason}</div>
        )}
      </label>

      {/* Additional optional fields (but validated by schema if present) */}
      <div className={styles.sep} />
      <div className={styles.card}>
        <h2>Thông tin bổ sung</h2>
        <p className={styles.hint}>
          Các trường này là tùy chọn nhưng sẽ giúp mentor hiểu bạn tốt hơn
        </p>

        <label className={styles.block}>
          <div className={styles.label}>Mục tiêu học tập cá nhân</div>
          <input
            name="personalGoal"
            className={styles.input}
            placeholder="VD: Đạt điểm A môn DSA"
            value={data.personalGoal}
            onChange={handleChange}
          />
          {errors.personalGoal && (
            <div className={styles.fieldError}>{errors.personalGoal}</div>
          )}
        </label>

        <label className={styles.block}>
          <div className={styles.label}>Ghi chú cho admin/giảng viên</div>
          <div className={styles.textareaWrap}>
            <textarea
              name="adminNote"
              className={styles.textarea}
              placeholder='VD: "Muốn học theo nhóm buổi tối" hoặc "Ưu tiên mentor có chuyên ngành AI"'
              value={data.adminNote}
              onChange={handleChange}
            />
            <div className={styles.counter}>
              {data.adminNote.length}/{maxChars} ký tự
            </div>
          </div>
          {errors.adminNote && (
            <div className={styles.fieldError}>{errors.adminNote}</div>
          )}
        </label>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.btnCancel}>
          Hủy
        </button>
        <button
          type="submit"
          className={styles.btnSubmit}
          disabled={submitting}
        >
          <span className={styles.btnLabel}>
            {submitting ? "Đang gửi..." : "Gửi đăng ký"}
          </span>
        </button>
      </div>
    </form>
  );
}
