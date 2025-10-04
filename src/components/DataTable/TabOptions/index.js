import { TabsTrigger, TabsList } from '@/components/ui/tabs';

export function TabOptions({ tabsList }) {
  function getLabel(tab) {
    const hyphenPlusLetter = /-([a-z])/g;
    let firstLetter = tab.charAt(0).toUpperCase();
    return firstLetter + tab.slice(1).replace(hyphenPlusLetter, (_, c) => ' ' + c.toUpperCase());
  }

  return (
    <TabsList
      className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 \
    **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex"
    >
      {tabsList.map((tab) => (
        <TabsTrigger key={tab}
          value={tab}>
          {getLabel(tab)}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
