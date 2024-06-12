import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button, Checkbox, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { loginSchema } from "./login-schema";
import { useApp } from "../../hooks/use-app";
import { login } from "./services";
import { FetchError, httpErrorStatus } from "../../utils";

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
  const { showToast } = useApp()
  const { status, mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      showToast({
        message: data.message,
        type: "success",
      })
    },
    onError: (err) => {
      const error = err as FetchError
      console.log(error.res.status)
      showToast({
        message: httpErrorStatus[error.res.status],
        type: "error",
      })
    },
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data)
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex w-full rounded-lg shadow-md p-4 flex-col gap-4">
        {
          status === "pending" ? <Spinner role="status"/> : null
        }
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
        <Button className="disabled:opacity-50" disabled={status === "pending"} type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
