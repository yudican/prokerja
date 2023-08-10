import * as yup from 'yup';

const validationSchema = yup.object().shape({
  nik: yup.string().required('NIK is required'),
  nama_lengkap: yup.string().required('Nama lengkap is required'),
  nomor_telepon: yup.string().required('Nomor telepon is required'),
  jenis_kelamin: yup.string().required('Jenis kelamin is required'),
  alamat: yup.string().required('Alamat is required'),
  rt: yup.string().required('RT is required'),
  rw: yup.string().required('RW is required'),
  tps: yup.string().required('TPS is required'),
  provinsi: yup.string().required('Provinsi is required'),
  kotakab: yup.string().required('Kota/Kabupaten is required'),
  kecamatan: yup.string().required('Kecamatan is required'),
  kelurahan: yup.string().required('Kelurahan is required'),
  preference_1: yup.string().required('Preference 1 is required'),
  preference_2: yup.string().required('Preference 2 is required'),
  preference_3: yup.string().required('Preference 3 is required'),
  preference_4: yup.string().required('Preference 4 is required'),
  preference_5: yup.string().required('Preference 5 is required'),
  image: yup.mixed().required('Attachment is Required'),
});

const loginValidationSchema = yup.object().shape({
  email: yup.string().required('Email Tidak Boleh Kosong'),
  password: yup.string().required('Kata Sandi Tidak Boleh Kosong'),
});

const registerValidationSchema = yup.object().shape({
  name: yup.string().required('Nama Tidak Boleh Kosong'),
  email: yup
    .string()
    .email('Email Tidak Valid')
    .required('Email Tidak Boleh Kosong'),
  password: yup
    .string()
    .min(6, 'Kata Sandi Harus 6 karakter atau lebih')
    .required('Password Tidak Boleh Kosong'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Konfirmasi kata sandi tidak sesuai')
    .required('Konfirmasi kata sandi Tidak Boleh Kosong'),
});

const forgotPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email Tidak Valid')
    .required('Email Tidak Boleh Kosong'),
});

const resetPasswordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(6, 'Kata Sandi Harus 6 karakter atau lebih')
    .required('Password Tidak Boleh Kosong'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Konfirmasi kata sandi tidak sesuai')
    .required('Konfirmasi kata sandi Tidak Boleh Kosong'),
});

const updateProfileValidationSchema = yup.object().shape({
  name: yup.string().required('Nama wajib diisi'),
  email: yup
    .string()
    .email('Alamat email tidak valid')
    .required('Email wajib diisi'),
  telepon: yup
    .string()
    .matches(/^\d+$/, 'Nomor telepon harus terdiri dari angka saja')
    .min(10, 'Nomor telepon harus memiliki setidaknya 10 angka')
    .max(15, 'Nomor telepon tidak boleh lebih dari 15 angka')
    .required('Nomor telepon wajib diisi'),
});

const updatePasswordValidationSchema = yup.object().shape({
  old_password: yup.string().required('Password Tidak Boleh Kosong'),
  password: yup
    .string()
    .min(8, 'Kata Sandi Harus 6 karakter atau lebih')
    .required('Password Tidak Boleh Kosong'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Konfirmasi kata sandi tidak sesuai')
    .required('Konfirmasi kata sandi Tidak Boleh Kosong'),
});

export {
  validationSchema,
  loginValidationSchema,
  registerValidationSchema,
  forgotPasswordValidationSchema,
  resetPasswordValidationSchema,
  updateProfileValidationSchema,
  updatePasswordValidationSchema,
};
