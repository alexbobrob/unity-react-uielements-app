import cleanJSXElementLiteralChild from './cleanJSXElementLiteralChild';

const types = {
    isJSXIdentifier(node) {
        return node && node.type === 'JSXIdentifier';
    },
    isJSXMemberExpression(node) {
        return node && node.type === 'JSXMemberExpression';
    },
    isIdentifier(node) {
        return node && node.type === 'Identifier';
    },
    isLiteral(node) {
        return node && node.type === 'Literal';
    },
    objectExpression(properties) {
        return {
            type: 'ObjectExpression',
            properties
        };
    },
    stringLiteral(value) {
        return {
            type: 'Literal',
            value,
            raw: `'${value}'`
        };
    },
    callExpression(callee, args) {
        return {
            type: 'CallExpression',
            callee,
            arguments: args
        };
    },
    inherits(call, node) {
        return call;
    },
    identifier(name) {
        return {
            type: 'Identifier',
            name
        };
    },
    memberExpression(object, property) {
        return {
            type: 'MemberExpression',
            object,
            property
        };
    },
    objectProperty(key, value) {
        return {
            type: 'Property',
            key,
            value
        };
    },
    arrayExpression(elements) {
        return {
            type: 'ArrayExpression',
            elements: elements
        };
    },
    isJSXSpreadAttribute(node) {
        return node && node.type === 'JSXSpreadAttribute';
    },
    isJSXAttribute(node) {
        return node && node.type === 'JSXAttribute';
    },
    isJSXExpressionContainer(node) {
        return node && node.type === 'JSXExpressionContainer';
    },
    isStringLiteral(node) {
        return node && node.type === 'Literal';
    },
    isJSXNamespacedName(node) {
        return node && node.type === 'JSXNamespacedName';
    },
    isObjectExpression(node) {
        return node && node.type === 'ObjectExpression';
    },
    isJSXText(node) {
        return node && node.type === 'JSXText';
    },
    isJSXEmptyExpression(node) {
        return node && node.type === 'JSXEmptyExpression';
    },
    nullLiteral() {
        return {
            type: 'Literal',
            value: null,
            raw: 'null'
        };
    }
}

const react = {
    buildChildren(node) {
        const elements = [];

        for (let i = 0; i < node.children.length; i++) {
            let child = node.children[i];

            if (types.isJSXText(child)) {
                cleanJSXElementLiteralChild(child, elements);
                continue;
            }

            if (types.isJSXExpressionContainer(child)) child = child.expression;
            if (types.isJSXEmptyExpression(child)) continue;

            elements.push(child);
        }

        return elements;
    },
    isCompatTag(tagName) {
        return !!tagName && /^[a-z]/.test(tagName);
    }
}

export default {
	types: {
		...types,
		react,
	}
};