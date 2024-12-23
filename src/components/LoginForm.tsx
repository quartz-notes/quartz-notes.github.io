import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import { Link } from "react-router";

type Inputs = {
  login: string;
  password: string;
};

function LoginForm() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="flex flex-col max-w-xl gap-4 bg-stone-50 dark:bg-stone-900 dark:text-stone-50 p-8">
      <form
        className="flex flex-col max-w-xl gap-4 bg-stone-50 dark:bg-stone-900 dark:text-stone-50 p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input {...register("login", { required: true })} />
        <Input {...register("password", { required: true })} />

        <Button type="submit">Войти</Button>
      </form>
      <Link
        className="text-center text-stone-400 dark:text-stone-500"
        to="/registration"
      >
        Нет аккаунта?
      </Link>
    </div>
  );
}

export default LoginForm;
