import React, { useEffect, useState } from "react";

const useCart = () => {
  const [cart, setCart] = useState([]);

  return [cart, setCart];
};

export default useCart;
