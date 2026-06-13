import RegistrationForm from '../components/RegistrationForm';

const Register = () => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      <div className="bg-white shadow-2xl rounded-3xl p-10">
        <h1 className="text-4xl font-bold text-center mb-10">Student Registration</h1>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Register;