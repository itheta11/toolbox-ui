import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { MockField } from "../../types/mock-api";
import { useMemo } from "react";

const fieldTypeDropdown = [
  {
    key: "string",
    text: "Text",
  },
  {
    key: "number",
    text: "Number",
  },
  {
    key: "boolean",
    text: "Bool",
  },
  {
    key: "date",
    text: "Date",
  },
];

interface FieldCardProps {
  mockField: MockField;
  onFieldNameChange: (id: string, name: string) => void;
  onFieldTypeChange: (id: string, type: string) => void;
  onRemove: (id: string) => void;
}

const FieldCard: React.FC<FieldCardProps> = (props) => {
  const selectedFielType = fieldTypeDropdown.find(
    (item) => item.key === props.mockField.type
  );
  const isFieldNameInValid = props.mockField.name.match(/^[A-Za-z0-9]+$/)
    ? false
    : true;
  return (
    <div className="m-2 p-1 bg-slate-800 rounded-sm flex justify-start items-center gap-2">
      <Input
        isRequired
        errorMessage="Please enter a valid field name"
        className="max-w-xs"
        placeholder="Enter field name"
        label="Field"
        labelPlacement="inside"
        name="name"
        isInvalid={isFieldNameInValid}
        value={props.mockField.name}
        onChange={(e) =>
          props.onFieldNameChange(props.mockField.id, e.target.value)
        }
      />
      <Dropdown>
        <DropdownTrigger>
          <Button className="" size="sm" variant="solid" color="primary">
            {selectedFielType.text}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          selectionMode="single"
          variant="flat"
          onAction={(key) =>
            props.onFieldTypeChange(props.mockField.id, key.toString())
          }
        >
          {fieldTypeDropdown.map((item) => (
            <DropdownItem key={item.key}>{item.text}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Button
        className=" ml-auto"
        size="sm"
        color="danger"
        onClick={() => props.onRemove(props.mockField.id)}
      >
        Remove
      </Button>
    </div>
  );
};

export default FieldCard;
