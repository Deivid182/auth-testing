import { Button, Checkbox, Label, TextInput, Alert } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./login-schema";

export type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex max-w-xl w-full rounded-lg shadow-md p-4 flex-col gap-4">
        <h1 className="text-3xl font-semibold text-center">Login Page</h1>
        <div className="flex flex-col gap-2">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            {...register("email", { required: true })}
            id="email"
            type="email"
            placeholder="email"
            required
          />
          {
            errors.email && <Alert color="failure">
              <span className="font-medium">
                {errors.email.message}
              </span>
            </Alert>
          }
        </div>
        <div className="flex flex-col gap-2">
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            {...register("password", { required: true })}
            id="password"
            type="password"
            required
          />
          {
            errors.password && <Alert color="failure">
              <span className="font-medium">
                {errors.password.message}
              </span>
            </Alert>
          }
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit">Login</Button>
      </form>
    </>
  );
};

export default LoginPage;
