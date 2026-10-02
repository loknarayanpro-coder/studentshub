'use client';

import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  ExternalLink,
  Star,
  Clock,
  IndianRupee,
} from 'lucide-react';
import { Opportunity } from '@/types';
import { useApp } from '@/lib/context/AppContext';
import { dataService } from '@/services/dataService';
import { getDaysRemaining } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const { toggleBookmark, isBookmarked } = useApp();
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const isSaved = isBookmarked('opportunity', opportunity.id);
  const { days, isExpired } = getDaysRemaining(opportunity.deadline);

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    dataService.incrementOpportunityClick(opportunity.id);
    window.open(opportunity.applyUrl, '_blank', 'noopener,noreferrer');
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark({
      type: 'opportunity',
      id: opportunity.id,
      title: opportunity.title,
      subtitle: `${opportunity.companyName} • ${opportunity.stipendOrSalary}`,
      badge: opportunity.type,
      link: `/internships?id=${opportunity.id}`,
    });
  };

  return (
    <>
      <Card
        hoverable
        onClick={() => setIsDetailsOpen(true)}
        className="p-4 sm:p-5 flex flex-col justify-between cursor-pointer border-[#26344D] bg-[#111B2E]"
      >
        <div>
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div>
              <span className="text-[11px] font-semibold text-[#94A3B8] block">
                {opportunity.companyName}
              </span>
              <h4 className="text-sm font-semibold text-[#F5F7FA] hover:text-[#B7F34A] transition-colors leading-snug">
                {opportunity.title}
              </h4>
            </div>

            <button
              onClick={handleBookmark}
              className={`p-1 rounded transition-colors ${
                isSaved ? 'text-[#B7F34A]' : 'text-[#94A3B8] hover:text-[#F5F7FA]'
              }`}
              title="Bookmark"
            >
              <Star className={`w-4 h-4 ${isSaved ? 'fill-[#B7F34A]' : ''}`} />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#94A3B8] mt-2 font-mono">
            <span className="text-[#F5F7FA] font-medium">{opportunity.stipendOrSalary}</span>
            <span>•</span>
            <span>{opportunity.location}</span>
            <span>•</span>
            <span className="capitalize">{opportunity.workMode}</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {opportunity.skillsRequired.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="text-[10px] px-2 py-0.5 rounded bg-[#0B1220] border border-[#26344D] text-[#94A3B8]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-3 mt-3 border-t border-[#26344D] flex items-center justify-between">
          <span className="text-[11px] text-[#94A3B8]">
            {isExpired ? 'Expired' : `${days} days left`}
          </span>

          <Button
            variant="primary"
            size="sm"
            disabled={isExpired}
            onClick={handleApply}
            className="text-xs"
          >
            Apply Now
            <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        </div>
      </Card>

      {/* Details Modal */}
      <Modal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        title={opportunity.title}
        description={`${opportunity.companyName} • ${opportunity.location}`}
        maxWidth="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#0B1220] p-3 rounded-xl border border-[#26344D] text-center text-xs">
            <div>
              <p className="text-[10px] text-[#94A3B8] uppercase">Compensation</p>
              <p className="font-semibold text-[#F5F7FA] mt-0.5">{opportunity.stipendOrSalary}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#94A3B8] uppercase">Mode</p>
              <p className="font-semibold text-[#F5F7FA] mt-0.5 capitalize">{opportunity.workMode}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#94A3B8] uppercase">Batch</p>
              <p className="font-semibold text-[#B7F34A] mt-0.5">{opportunity.graduationYears.join(' / ')}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#94A3B8] uppercase">Deadline</p>
              <p className="font-semibold text-[#F5F7FA] mt-0.5">{isExpired ? 'Expired' : `${days}d left`}</p>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-[#F5F7FA] mb-1">Description:</h5>
            <p className="text-xs text-[#94A3B8] leading-relaxed bg-[#0B1220] p-3 rounded-xl border border-[#26344D]">
              {opportunity.description}
            </p>
          </div>

          <div>
            <h5 className="text-xs font-semibold text-[#F5F7FA] mb-1.5">Required Skills:</h5>
            <div className="flex flex-wrap gap-1.5">
              {opportunity.skillsRequired.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2.5 py-1 rounded bg-[#0B1220] border border-[#26344D] text-[#94A3B8]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#26344D] flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
            <Button variant="primary" size="sm" disabled={isExpired} onClick={handleApply}>
              Apply Now
              <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
