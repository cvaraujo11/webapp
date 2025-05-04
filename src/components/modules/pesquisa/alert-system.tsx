import React, { useState } from 'react';
import { PlusIcon, BellIcon, CheckIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface Alert {
  id: number;
  keyword: string;
  active: boolean;
  categories: string[];
}

const AlertSystem: React.FC = () => {
  const [newKeyword, setNewKeyword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([
    { 
      id: 1, 
      keyword: 'audiovisual', 
      active: true, 
      categories: ['Editais Abertos', 'Financiamento']
    },
    { 
      id: 2, 
      keyword: 'patrimônio cultural', 
      active: true, 
      categories: ['Editais Abertos', 'Premiações']
    },
    { 
      id: 3, 
      keyword: 'artes visuais', 
      active: false, 
      categories: ['Editais Abertos']
    }
  ]);

  const handleAddAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;

    const newAlert: Alert = {
      id: Date.now(),
      keyword: newKeyword.trim(),
      active: true,
      categories: ['Editais Abertos']
    };

    setAlerts([...alerts, newAlert]);
    setNewKeyword('');
    setShowForm(false);
  };

  const toggleAlertStatus = (id: number) => {
    setAlerts(
      alerts.map(alert => 
        alert.id === id ? { ...alert, active: !alert.active } : alert
      )
    );
  };

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground">
          Receba notificações quando novos editais relacionados aos seus interesses forem publicados
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowForm(!showForm)}
          className="gap-1"
        >
          <PlusIcon className="h-3.5 w-3.5" />
          Novo Alerta
        </Button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAddAlert} className="border rounded-md p-3 mb-4 bg-muted/20">
              <div className="text-sm font-medium mb-2">Adicionar Alerta</div>
              <div className="flex gap-2 mb-3">
                <Input
                  type="text"
                  placeholder="Palavra-chave (ex: música, teatro)"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="sm" disabled={!newKeyword.trim()}>
                  Adicionar
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                Você receberá alertas quando novos editais contendo esta palavra-chave forem publicados
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3 max-h-[250px] overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <BellIcon className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
            <p>Nenhum alerta configurado</p>
            <p className="text-sm mt-1">Adicione palavras-chave para receber notificações sobre novos editais</p>
          </div>
        ) : (
          alerts.map(alert => (
            <div 
              key={alert.id} 
              className={`flex items-center justify-between p-3 rounded-md border ${
                alert.active ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-100'
              }`}
            >
              <div className="flex-1">
                <div className="font-medium">{alert.keyword}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {alert.categories.map((category, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs bg-white">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`alert-${alert.id}`}
                    checked={alert.active}
                    onCheckedChange={() => toggleAlertStatus(alert.id)}
                  />
                  <Label htmlFor={`alert-${alert.id}`} className="sr-only">
                    {alert.active ? 'Desativar' : 'Ativar'} alerta
                  </Label>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAlert(alert.id)}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                >
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Remover alerta</span>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {alerts.length > 0 && (
        <div className="mt-4 pt-3 border-t text-xs text-muted-foreground flex items-center">
          <CheckIcon className="h-3.5 w-3.5 mr-1 text-green-500" />
          <span>
            {alerts.filter(a => a.active).length} alerta(s) ativo(s) de {alerts.length} configurado(s)
          </span>
        </div>
      )}
    </div>
  );
};

export default AlertSystem;
