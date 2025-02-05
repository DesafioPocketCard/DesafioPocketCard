interface ICardSelectProps<T> {
    title?: React.ReactNode;
    options: T[];
    optionLabelKey: keyof T & string;
    optionValueKey: keyof T & string;
    onChange: (value: T) => void;

}