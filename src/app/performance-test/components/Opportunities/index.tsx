import { IOpportunities } from '@/app/api/performance-test/types';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { getStatusColorByScore } from '@/utils/getColor';

interface OpportunitiesProps {
  opportunities: IOpportunities[];
}

export function Opportunities({ opportunities }: OpportunitiesProps) {
  return (
    <div>
      <p className="tracking-wide">Oportunidades</p>
      <p className="mt-1 text-sm font-light text-gray-300">
        Essas sugestões podem ajudar sua página a carregar mais rápido. Elas não
        afetam diretamente o Score de Performance
      </p>

      <div className="mt-4">
        {opportunities?.length === 0 && (
          <p className="text-center text-sm text-gray-300">
            Infelizmente não encontramos nenhuma melhoria disponível para a sua
            página...
          </p>
        )}
        {opportunities?.map((opportunity) => {
          const scoreColor = getStatusColorByScore(opportunity.score);
          return (
            <Accordion key={opportunity.id} type="single" collapsible>
              <AccordionItem value="item-1" className="w-full">
                <AccordionTrigger className="flex w-full items-center font-light hover:no-underline">
                  <div className="flex w-full items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className={`h-3 w-3 ${scoreColor.background}`} />
                      {opportunity.title}
                    </span>
                    <p
                      className={`pr-2 text-sm font-light tracking-wider text-gray-300 ${scoreColor[500]}`}
                    >
                      {opportunity?.numericValue}s
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {opportunity?.description?.text && (
                    <span className="text-sm leading-relaxed text-gray-300">
                      {opportunity?.description?.text}{' '}
                      {opportunity?.description?.url && (
                        <a
                          className="cursor-pointer text-blue-500 hover:underline"
                          href={opportunity?.description?.url || ''}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {opportunity?.description?.knowMore}
                        </a>
                      )}
                    </span>
                  )}
                  <div className="mt-6">
                    <div className="flex w-full items-center justify-between">
                      <div className="w-[70%]">
                        <p>URL</p>
                      </div>
                      <div className="flex w-[30%] items-center justify-between">
                        <p className="text-right ">Tamanho (KiB)</p>
                        <p className="text-right ">Potencial Salvo</p>
                      </div>
                    </div>

                    {opportunity?.details?.items?.map((item) => (
                      <div
                        key={item.url}
                        className="my-2 flex w-full items-center justify-between"
                      >
                        <div className="w-[70%]">
                          <a
                            className="cursor-pointer text-xs font-light text-gray-300 hover:underline"
                            href={item.url}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {item.url?.slice(0, 90)}
                            {item.url.length >= 90 && '...'}
                          </a>
                        </div>
                        <div className="flex w-[30%] items-center justify-between">
                          <p className="pr-4 text-right text-xs font-light text-gray-300">
                            {Boolean(item.totalBytes) &&
                              `${item.totalBytes} KiB`}
                          </p>
                          <p className="pr-4 text-right text-xs font-light text-gray-300">
                            {item?.wastedBytes && `${item?.wastedBytes} Kib`}
                            {item?.wastedMs && `${item?.wastedMs} ms`}
                            {item?.responseTime && `${item?.responseTime} ms`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}
