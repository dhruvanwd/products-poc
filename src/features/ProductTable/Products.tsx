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
import {
  checkAllItems,
  clearAllChecks,
  fetchProducts,
  selectProducts,
} from "./productsSlice";
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
    const tempSelectedValue = event.target.value;
    console.log(tempSelectedValue);
    dispatch(clearAllChecks());
    setSelectedValue(tempSelectedValue);
    const findIndex = products.findIndex(
      (item) => item.headName === tempSelectedValue
    );
    dispatch(checkAllItems({ index: findIndex }));
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products.length > 0 && selectedValue === "a") {
      setSelectedValue(products[0].headName);
      dispatch(checkAllItems({ index: 0 }));
    }
  }, [products, dispatch, selectedValue]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.row}>
      <RadioGroup
        onChange={handleChange}
        value={selectedValue}
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
            <ProductTable key={product.headName} productIndex={index} />
          </>
        ))}
      </RadioGroup>
    </div>
  );
}
