import { Id, toast } from "react-toastify";
import Spinner from "./Spinner";

interface IErrorToast {
  error?: unknown;
  fallbackMessage?: string;
}

const Toast = {
  success: (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  error: ({ error, fallbackMessage = "ERRO" }: IErrorToast) => {
    let errorMessage = fallbackMessage;
    if (error) {
      errorMessage = "ERRO";
    }

    const regex = /sites\/[0-9a-z-]+\/routers\/[0-9a-z-]+\/dashboard/gm;
    if (regex.test(window.location.pathname)) return;
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  },

  loading: (message: string) => {
    const id = toast(message, {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: Spinner,
    });
    return id;
  },

  update: (id: Id, message: string, error?: boolean) => {
    if (error) {
      toast.update(id, {
        render: message,
        type: "error",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: undefined,
      });
    } else {
      toast.update(id, {
        render: message,
        type: "success",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: undefined,
      });
    }
  },
};

export default Toast;
