import { useState, Fragment } from "react";
import Button from "../components/Button";
const initialColors = [
  {
    className: "task--bg-gray",
    formStyle: "form__color-box--gray",
    id: "task-gray",
    selected: true,
  },
  {
    className: "task--bg-blue",
    formStyle: "form__color-box--blue",
    id: "task-blue",
    selected: false,
  },
  {
    className: "task--bg-red",
    formStyle: "form__color-box--red",
    id: "task-red",
    selected: false,
  },
  {
    className: "task--bg-pink",
    formStyle: "form__color-box--pink",
    id: "task-pink",
    selected: false,
  },
];

const initialTask = {
  name: "",
  color: initialColors.find((color) => color.selected).className,
  complete: false,
};
export const FormTask = ({ onCreateTask }) => {
  const [task, setTask] = useState(initialTask);
  const [colors, setColors] = useState(initialColors);

  const handleChangeColor = (e) => {
    const colorSelected = e.target.value;
    const newColorIdx = colors.findIndex(
      (item) => item.className === colorSelected
    );
    const prevColorIdx = colors.findIndex((item) => item.selected);

    const newColors = colors.map((color, idx) =>
      idx === newColorIdx || idx === prevColorIdx
        ? { ...color, selected: !color.selected }
        : { ...color }
    );

    setColors(newColors);
    setTask({ ...task, color: colorSelected });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name) {
      onCreateTask(task);
      resetTask();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTask({ ...task, [name]: value });
  };

  const resetTask = () => {
    setTask(initialTask);
    setColors(initialColors);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__item">
        <label htmlFor="task-name" className="form__label">
          Nombre de la tarea
        </label>
        <input
          className="form__input"
          id="task-name"
          onChange={handleChange}
          name="name"
          placeholder="Tarea de ejemplo..."
          type="text"
          value={task.name}
        />
      </div>
      <div className="form__item form__item--flex-row">
        {colors.map((color) => (
          <Fragment key={color.id}>
            <input
              checked={color.selected}
              className="form__radio"
              onChange={handleChangeColor}
              id={color.id}
              name="task-color"
              type="radio"
              value={color.className}
            />
            <label
              htmlFor={color.id}
              className={`form__color-box ${color.formStyle}`}
            ></label>
          </Fragment>
        ))}
      </div>
      <div className="form__item">
        <Button color="blue" text="Añadir tarea" />
      </div>
    </form>
  );
};
