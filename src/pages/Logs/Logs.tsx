import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Info,
  AlertCircle,
  X,
  ChevronDown,
  Clock,
  Calendar,
} from "lucide-react";

import "react-datepicker/dist/react-datepicker.css";
import Card, { CardBody, CardHeader } from "../../components/Card";
import { useAuth } from "../../authentication/AuthProvider";
import { getLogs } from "../../api/logs";
import { UserLogs } from "../../types/UserLogs";
// import { newDate } from 'react-datepicker/dist/date_utils';

const Logs: React.FC = () => {
  const { authenticatedUser } = useAuth();
  const [logs, setLogs] = useState<UserLogs>();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    startOfMonth(new Date()),
    endOfMonth(new Date()),
  ]);
  const [startDate, endDate] = dateRange;

  const totalHours = logs?.apuracaoPonto?.reduce(
    (accumulator, current) =>
      current.horasTotalNaoExtra
        ? accumulator + current.horasTotalNaoExtra
        : accumulator,
    0
  );

  const fetchLogs = async (
    start: Date | null = null,
    end: Date | null = null
  ) => {
    try {
      const response = await getLogs({
        //id:654,
        // dataInicio: "2024-10-01T00:00:00.000Z",
        // dataFim: "2024-10-05T00:00:00.000Z",
        //token: "SDMaAKILAfxBmq6xc9PzCyFMLxFZn6atgJRndn0VhS6AQO9oMK",
        id: parseInt(authenticatedUser?.id ?? '0') ,
        dataInicio: start?.toISOString() ?? "",
        dataFim: end?.toISOString() ?? "",
        token: authenticatedUser?.token ?? '',
      });
      console.log(response);
      if (
        response?.apuracaoPonto?.length &&
        response?.apuracaoPonto?.length > 0
      ) {
        setLogs(response);
      }
    } catch (err) {
      alert("Error fetching logs");
    }
  };

  const getStatusIcon = (
    status: "fa fa-times" | "fa fa-info" | undefined,
    color: "danger" | "info" | undefined
  ) => {
    switch (status) {
      case "fa fa-info":
        return color === "info" ? (
          <Info className="h-5 w-5 text-blue-1" aria-label="Normal" />
        ) : (
          <AlertCircle className="h-5 w-5 text-red-1" aria-label="Alert" />
        );
      case "fa fa-times":
        return <X className="h-5 w-5 text-red-1" aria-label="Absence" />;
    }
  };

  function extractTimestamp(dateString: string) {
    const timestampMatch = dateString.match(/\/Date\((\d+)-\d{4}\)\//);
    return timestampMatch ? parseInt(timestampMatch[1]) : null;
  }

  useEffect(() => {
    fetchLogs(startOfMonth(new Date()), endOfMonth(new Date()));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-bold">Registros de Ponto</h2>
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
              <div className="relative">
                <DatePicker
                  selectsRange={true}
                  startDate={startDate ?? undefined}
                  endDate={endDate ?? undefined}
                  onChange={(update: [Date | null, Date | null]) => {
                    setDateRange(update);
                    fetchLogs(...update);
                  }}
                  locale={ptBR}
                  dateFormat="dd/MM/yyyy"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm"
                  customInput={
                    <button className="flex w-full items-center justify-between space-x-2 rounded-md border border-gray-300 px-4 py-2 sm:w-auto">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <span>
                        {startDate && endDate
                          ? `${format(startDate, "dd/MM/yyyy")} - ${format(
                              endDate,
                              "dd/MM/yyyy"
                            )}`
                          : "Selecione o período"}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  }
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-3">
                  <th className="px-2 py-2 text-left">Data</th>
                  <th className="hidden px-2 py-2 text-left sm:table-cell">
                    Dia
                  </th>
                  <th className="py-2 text-left">Status</th>
                  <th className="px-2 py-2 text-left">Horário</th>
                  <th className="px-2 py-2 text-left">Registros</th>
                  <th className="px-2 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {logs?.apuracaoPonto?.map((log, index) => {
                  // Extract and convert date
                  const dateTimestamp = log.date && extractTimestamp(log.date);
                  const date = dateTimestamp ? new Date(dateTimestamp) : null;

                  return (
                    <tr
                      key={index}
                      className="border-b border-gray-3 hover:bg-gray-6"
                    >
                      <td className="px-4 py-2">
                        <div className="font-medium">
                          {date && format(date, "dd/MM")}
                        </div>
                        <div className="text-sm text-gray-1 sm:hidden">
                          {date && format(date, "eee")}
                        </div>
                      </td>
                      <td className="hidden px-4 py-2 sm:table-cell">
                        {date && format(date, "eee")}
                      </td>
                      <td className="px-4 py-2">
                        {getStatusIcon(log.iconAlert, log.colorAlert)}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-1">
                        {log.strHorarioContratualSimples
                          ?.split("\r\n")
                          .map((time, index) => (
                            <p key={index}>{time}</p>
                          ))}
                      </td>
                      <td className="px-4 py-2">
                        <div className="space-y-1">
                          {log?.listAfdtManutencao?.map(
                            (timeLog, timeIndex) => (
                              <p className="font-medium" key={timeIndex}>
                                {!timeLog.pis &&
                                  `${timeLog.hora
                                    ?.toString()
                                    ?.slice(0, -2)}:${timeLog.hora
                                    ?.toString()
                                    ?.slice(-2)}`}
                              </p>
                            )
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 text-right font-medium">
                        {log.horasTotalNaoExtra &&
                          `${Math.floor(log.horasTotalNaoExtra / 60)}${
                            log.horasTotalNaoExtra / 60 >= 1 &&
                            `:${log.horasTotalNaoExtra % 60}`
                          }`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-semibold">
                  <td
                    colSpan={5}
                    className="px-4 py-2 text-right hidden sm:table-cell"
                  >
                    Total do Período
                  </td>
                  <td colSpan={4} className="px-4 py-2 text-right sm:hidden">
                    Total do Período
                  </td>
                  <td className="px-4 py-2 text-right">
                    {totalHours
                      ? `${Math.floor(totalHours / 60)}${
                          totalHours / 60 >= 1 && `:${totalHours % 60}`
                        }`
                      : 0}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Logs;
