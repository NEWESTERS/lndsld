<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@lndsld/data-structures](./data-structures.md) &gt; [IStack](./data-structures.istack.md) &gt; [InferValue](./data-structures.istack.infervalue.md)

## IStack.InferValue type

<b>Signature:</b>

```typescript
type InferValue<S> = S extends IStack<infer T> ? T : never;
```
