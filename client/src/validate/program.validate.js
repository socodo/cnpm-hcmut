import { z } from "zod";

export const programSchema = z.object({
  subject: z.string().min(1, "Vui lòng chọn môn học cần hỗ trợ."),
  problem: z
    .string()
    .trim()
    .min(1, "Vui lòng mô tả vấn đề cụ thể bạn cần mentor.")
    .max(500, "Tối đa 500 ký tự."),
  format: z.string().min(1, "Vui lòng chọn hình thức mong muốn."),
  mentoringType: z.string().min(1, "Vui lòng chọn kiểu mentoring."),
  reason: z
    .string()
    .trim()
    .min(1, "Vui lòng cho biết lý do cần mentoring.")
    .max(500, "Tối đa 500 ký tự."),
  personalGoal: z.string().trim().max(300).optional().or(z.literal("")),
  adminNote: z.string().trim().max(500).optional().or(z.literal("")),
});

export function validateProgram(data) {
  return programSchema.safeParse(data);
}

// dùng cho validate từng trường khi onChange/onBlur
export function validateField(name, value) {
  const pick = programSchema.pick({ [name]: true });
  return pick.safeParse({ [name]: value });
}
