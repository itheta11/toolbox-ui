import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { Form } from "@nextui-org/form";
import { useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import FieldCard from "../../components/MockApi/FieldCard";
import { MockField } from "../../types/mcok-api";
import { ALL_TYPES } from "../../types";
import { toast } from "react-toastify";
import { getFakerValue } from "../../helpers/json/json-helpers";
import { faker } from "@faker-js/faker";

const getNewMockField = (): MockField =>
  JSON.parse(
    JSON.stringify({
      id: uuid(),
      name: "",
      type: "string",
      module: null,
      moduleType: null,
    })
  );
export default function MockApi() {
  const [fields, setFields] = useState<MockField[]>([getNewMockField()]);
  const [submitted, setSubmitted] = useState(null);

  const handleFieldNameChange = (id: string, name: string) => {
    setFields((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              name,
            }
          : item
      )
    );
  };

  const handelFielTypeChange = (id: string, fieldType: ALL_TYPES) => {
    setFields((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              type: fieldType,
            }
          : item
      )
    );
  };

  const addNewMockField = () => {
    setFields((currFields) => [...currFields, getNewMockField()]);
  };

  const handleRemoveField = (id: string) => {
    const itemIndex = fields.findIndex((item) => item.id === id);
    if (itemIndex >= 0) {
      setFields((prevItems) => {
        prevItems.splice(itemIndex, 1);
        console.log(prevItems);
        return [...prevItems];
      });
    }
  };

  const onSubmit = () => {
    try {
      if (fields.length == 0) {
        throw Error("Invalid Schema");
      }

      const createMockObj = () => {
        let resultJson = Object.create(null);
        fields.forEach((field) => {
          if (!(field.name in resultJson)) {
            resultJson[field.name] = getFakerValue(field.type);
          }
        });
        return resultJson;
      };
      const mockData = faker.helpers.multiple(createMockObj, { count: 50 });
      console.log("final result", mockData);
    } catch (er) {
      console.error(er);
      toast.error(er.message, {
        autoClose: 1000,
        theme: "colored",
      });
    }
  };
  return (
    <div className="h-full flex flex-col">
      <div className="w-full pb-2 border-b-2 border-slate-400">
        <h2 className="text-3xl font-extrabold tracking-tight">Mock Api</h2>
      </div>
      <div className="flex-auto h-[calc(100vh-80px)] flex p-2">
        <div className="flex-1 ">
          <div className="flex justify-between px-2">
            <h3 className="text-xl"> Create your schema</h3>
            <Button size="md" color="primary" type="submit" onClick={onSubmit}>
              Generate Json
            </Button>
          </div>
          <br />
          <br />
          <ul>
            {fields.length > 0
              ? fields.map((field) => {
                  return (
                    <li key={field.id}>
                      <FieldCard
                        mockField={field}
                        onFieldNameChange={handleFieldNameChange}
                        onFieldTypeChange={handelFielTypeChange}
                        onRemove={handleRemoveField}
                      />
                    </li>
                  );
                })
              : null}
          </ul>
          <Button size="md" color="secondary" onClick={addNewMockField}>
            Add
          </Button>
        </div>
        <div className="flex-1 bg-slate-500"></div>
      </div>
    </div>
  );
}
