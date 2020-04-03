import * as React from "react";

const defaultProps = {
  make: "Volvo",
  model: "XC60",
  year: 2012
};

type Props = {
  make: string;
  year: number;
  model: string;
} & typeof defaultProps;

const Cars: React.FunctionComponent<Props> = ({ make, model, year}) => {
  return (
    <div>
      {year}
      {make}
      {model}
    </div>
  );
}

Cars.defaultProps = defaultProps;

export default Cars;
