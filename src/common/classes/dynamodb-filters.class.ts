
import { AttributeValue, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import { GeneralHelper } from "../helpers/general.helper";

export class DynamoDBFilters {

    // Table name
    // ============================
    private _tableName: string = '';

    public get tableName(): string {
        return this._tableName;
    }

    public set tableName(value: string) {
        this._tableName = value;
    }

    // Expressions
    // ============================
    private _expressions: string[] = [];

    public get expressions(): string[] {
        return this._expressions;
    }

    public set expressions(value: string[]) {
        this._expressions = value;
    }

    // Expression attribute values
    // ============================
    private _expressionAttributeValues: Record<string, AttributeValue> = {};

    public get expressionAttributeValues(): Record<string, AttributeValue> {
        return this._expressionAttributeValues;
    }

    public set expressionAttributeValues(value: Record<string, AttributeValue>) {
        this._expressionAttributeValues = value;
    }

    // Filter expression
    // ============================
    private _filterExpression: string = '';

    public get filterExpression(): string {
        return this._filterExpression;
    }

    public set filterExpression(value: string) {
        this._filterExpression = value;
    }

    public table(name: string): void {
        this.tableName = name;
    }

    public set(params: any, key: string, expression: string, value: Record<string, AttributeValue>): void {
        if (GeneralHelper.existsAndNotEmpty(params, key)) {
            this.expressions.push(expression);
            Object.assign(this.expressionAttributeValues, value);
        }
    }

    public get scanCommandData(): ScanCommandInput {
        let scanData: ScanCommandInput = { TableName: this.tableName };

        if (this.expressions.length > 0) {
            Object.assign(scanData, {
                FilterExpression: this.filterExpression,
                ExpressionAttributeValues: this.expressionAttributeValues
            });
        }

        return scanData;
    }

    join(connector: string = ' AND '): void {
        this.filterExpression = this.expressions.join(connector);
    }

}