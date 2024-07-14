"use client";
import React from "react";
import scss from "../components/TelegramContact.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface IFormTelegram {
  userName: string;
  email: string;
  subject: string;
  description: string;
}

const TelegramContact = () => {
  const { register, handleSubmit } = useForm<IFormTelegram>();

  const TOKEN = process.env.NEXT_PUBLIC_TG_TOKEN;
  const CHAT_ID = process.env.NEXT_PUBLIC_TG_CHAT_ID;

  const messageModel = (data: IFormTelegram) => {
    let messageTG = `UserName: <b>${data.userName}</b>\n`;
    messageTG += `Email Addres:   <b>${data.email}</b>\n`;
    messageTG += `Subject:  <b>${data.subject} </b>\n`;
    messageTG += `Description: <b>${data.description}</b>\n`;
    return messageTG;
  };

  const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
    await axios.post(
      `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TG_TOKEN}/sendMessage`,
      {
        chat_id: process.env.NEXT_PUBLIC_TG_CHAT_ID,
        parse_mode: "html",
        text: messageModel(data),
      }
    );
  };

  return (
    <div className={scss.TelegramContact}>
      <div className="container">
        <div className={scss.content}>
          <h1>TelegramContact</h1>
          <form className={scss.forms} onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="userName"
              type="text"
              {...register("userName", { required: true })}
            />
            <input
              placeholder="email"
              type="text"
              {...register("email", { required: true })}
            />
            <input
              placeholder="subject"
              type="text"
              {...register("subject", { required: true })}
            />
            <input
              placeholder="description"
              type="text"
              {...register("description", { required: true })}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TelegramContact;
