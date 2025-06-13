"use client";
import React from "react";
import { Button, TextField } from "@radix-ui/themes";
import Link from "next/link";
const page = () => {
  return (
    <div>
      <div className="">
        <Button>
          <Link href="/issues/new">new issue</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
