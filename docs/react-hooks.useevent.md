<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@lndsld/react-hooks](./react-hooks.md) &gt; [useEvent](./react-hooks.useevent.md)

## useEvent() function

Get stable reference to event handler

<b>Signature:</b>

```typescript
declare function useEvent<P extends unknown[]>(callback: EventCallback<P>): EventCallback<P>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  callback | [EventCallback](./react-hooks.eventcallback.md)<!-- -->&lt;P&gt; | event handler |

<b>Returns:</b>

[EventCallback](./react-hooks.eventcallback.md)<!-- -->&lt;P&gt;

event handler with stable ref
