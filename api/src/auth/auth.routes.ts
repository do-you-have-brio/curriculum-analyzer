import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { signinSchema, signupSchema } from "./auth.dto";
import { AuthService } from "./auth.service";

export const authRoutes = new Hono();

const authService = new AuthService();

authRoutes.post("/signin", async (c) => {
  try {
    const { email, password } = signinSchema.parse(await c.req.json());

    const res = await authService.signin({ email, password });

    return c.json({ token: res });
  } catch (err) {
    if (err instanceof HTTPException) {
      return c.json(err.getResponse());
    }

    return c.json({ message: err }, 500);
  }
});

authRoutes.post("/signup", async (c) => {
  try {
    const { email, password } = signupSchema.parse(await c.req.json());
    const res = await authService.signup({ email, password });
    return c.json({ token: res });
  } catch (err) {
    if (err instanceof HTTPException) {
      // Get the custom response
      return err.getResponse();
    }
  }
});
