import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Drawer, Form, Input, DatePicker, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { addTodo, getTodos } from "../../../actions/todo.actions";
const { Option } = Select;

const AddTodo = ({ step }) => {
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [deadline, setDeadline] = useState("");
  const dispatch = useDispatch();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const cancelAddTodo = () => {
    setTodo("");
    setDescription("");
    setPriority("");
    setDeadline("");
  };

  const validateMessages = {
    required: "${label} is required!",
  };

  const handleAddTodo = async () => {
    if (todo) {
      const data = {
        name: todo,
        description: description,
        priority: priority,
        deadline: deadline,
        step: step._id,
      };

      await dispatch(addTodo(data));
      cancelAddTodo();
      setOpen(!open);
      dispatch(getTodos());
      window.location.reload();
    }
  };

  return (
    <>
      <span
        className="mx-3"
        style={{ cursor: "pointer" }}
        onClick={() => setOpen(!open)}
      >
        <PlusOutlined style={{ position: "relative", top: "-3px" }} /> Nouvelle
        tâche
      </span>

      <Drawer
        title="Ajouter une nouvelle tâche"
        placement="left"
        onClose={() => setOpen(!open)}
        open={open}
      >
        <Form
          {...layout}
          name="nest-messages"
          // onFinish={handleAddTodo}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="todo"
            label="Tâche"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input onChange={(e) => setTodo(e.target.value)} />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea onChange={(e) => setDescription(e.target.value)} />
          </Form.Item>

          <Form.Item name="priority" label="Priorité">
            <Select placeholder="Priorité" onChange={(e) => setPriority(e)}>
              <Option value="Urgente">Urgente</Option>
              <Option value="Élevée">Élevée</Option>
              <Option value="Normale">Normale</Option>
              <Option value="Basse">Basse</Option>
            </Select>
          </Form.Item>

          <Form.Item name="deadline" label="Echéance">
            <DatePicker
              onChange={(date, dateString) => setDeadline(date, dateString)}
              format="DD/MM/YYYY"
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit" onClick={handleAddTodo}>
              Ajouter
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default AddTodo;
