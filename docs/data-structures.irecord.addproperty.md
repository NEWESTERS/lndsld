<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@lndsld/data-structures](./data-structures.md) &gt; [IRecord](./data-structures.irecord.md) &gt; [AddProperty](./data-structures.irecord.addproperty.md)

## IRecord.AddProperty type

<b>Signature:</b>

```typescript
type AddProperty<R extends IRecord, K extends AnyKey, V> = K extends keyof R ? never : R & IRecord<K, V>;
```