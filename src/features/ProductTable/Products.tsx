import {
  FormControlLabel,
  FormControlLabelProps,
  Radio,
  RadioGroup,
  styled,
  useRadioGroup,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./Products.module.css";
import { fetchProducts, selectProducts } from "./productsSlice";
import ProductTable from "./ProductTable";

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

export default function Products() {
  const products = useAppSelector(selectProducts);
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSelectedValue(event.target.value);
  };
  const dispatch = useAppDispatch();
  console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.row}>
      <RadioGroup
        onChange={handleChange}
        name="use-radio-group"
        defaultValue="first"
      >
        {products.map((product, index) => (
          <>
            <MyFormControlLabel
              value={product.headName}
              label={product.headName}
              control={<Radio />}
            />
            <ProductTable
              key={product.headName}
              productIndex={index}
              productsList={product.itemList}
            />
          </>
        ))}
      </RadioGroup>
    </div>
  );
}
